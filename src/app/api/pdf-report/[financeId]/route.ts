import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import {
	companies,
	companyHolders,
	finances,
	users,
} from "@/server/db/_main-schema";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

import {
	convertNumericFields,
	genPDF,
	hitungLabaRugi,
	hitungNeraca,
	processFinanceData,
} from "./reporting";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, "scripts", "pdf-worker.cjs");

async function handler(
	req: NextRequest,
	{
		params,
	}: {
		params: Promise<{ financeId: string }>;
	},
) {
	if (req.method !== "GET")
		return new Response("Invalid request method!\n", { status: 400 });

	const userLoggedIn = await auth();

	if (!userLoggedIn)
		return new Response("You must logged in first!\n", { status: 400 });

	const { financeId } = await params;
	const id = Number.parseInt(financeId);

	if (Number.isNaN(id))
		return new Response("Must be a number!\n", { status: 400 });

	const holder = await db.query.companyHolders.findFirst({
		where: eq(companyHolders.userId, userLoggedIn.user.id),
	});

	if (!holder || !holder.approved)
		return new Response("You are not an approved holder\n", { status: 400 });

	const result = await db
		.select()
		.from(finances)
		.innerJoin(companyHolders, eq(finances.companyId, companyHolders.companyId))
		.innerJoin(companies, eq(finances.companyId, companies.id))
		.innerJoin(users, eq(users.id, companyHolders.userId))
		.where(eq(finances.id, id));

	const data = result[0];

	if (!data) return new Response("Record not found\n", { status: 404 });

	const convertedData = convertNumericFields(data.finance);
	const neraca = hitungNeraca(convertedData);
	const labaRugi = hitungLabaRugi(convertedData);

	const processedData = processFinanceData({
		neraca,
		labaRugi,
		reportId: id,
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		createdAt: data.finance.createdAt!,
		usahaName: data.company.name,
	});

	const processedDataString = JSON.stringify(processedData);

	try {
		const child = spawn("node", [workerPath]);

		let pdfBuffer = Buffer.from([]);
		child.stdout.on("data", (chunk) => {
			pdfBuffer = Buffer.concat([pdfBuffer, chunk]);
		});

		child.stderr.on("data", (data) => {
			console.error(`Child process error: ${data}`);
		});

		await new Promise<void>((resolve, reject) => {
			child.on("close", (code) => {
				if (code === 0) resolve();
				else reject(new Error(`Child process exited with code ${code}`));
			});

			child.stdin.write(processedDataString);
			child.stdin.end();
		});

		return new Response(pdfBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename=Report-${
					data.company.name
				}-#${id}-${Date.now()}.pdf`,
			},
		});
	} catch (error) {
		console.error("PDF generation failed:", error);
		return new Response("Failed to generate PDF", { status: 500 });
	}
}

export { handler as GET, handler as POST };
