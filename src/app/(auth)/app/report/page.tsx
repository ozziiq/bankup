import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { companyHolders, finances, users } from "@/server/db/_main-schema";
import { desc, eq } from "drizzle-orm";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Laporan Keuangan",
};

export default async function ReportPage() {
	const userData = await auth();

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const currentUserId = userData!.user.id;

	const result = await db
		.select({
			financeId: finances.id,
			author: users.name,
			authorImage: users.image,
			labaBerjalan: finances.labaBerjalan,
			createdAt: finances.createdAt,
		})
		.from(finances)
		.innerJoin(companyHolders, eq(finances.companyId, companyHolders.companyId))
		.innerJoin(users, eq(users.id, companyHolders.userId))
		.where(eq(companyHolders.userId, currentUserId))
		.orderBy(desc(finances.createdAt));

	return (
		<div className="space-y-4">
			<h2 className="scroll-m-20 pb-2 font-semibold text-3xl tracking-tight first:mt-0">
				Laporan Keuangan
			</h2>

			<div className="space-y-3 pb-4">
				{result.length < 1 ? <p>Tidak ada data.</p> : null}
				{result.map((report) => (
					<Card key={report.financeId}>
						<CardHeader>
							<CardTitle>Laporan Keuangan</CardTitle>
							<CardDescription>
								{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
								{report.createdAt!.toLocaleString("id-ID")}
							</CardDescription>
							<CardAction>#{report.financeId}</CardAction>
						</CardHeader>
						<CardContent>
							<p>
								<b>Laba Berjalan:</b> Rp{" "}
								{new Intl.NumberFormat("id-ID").format(
									// biome-ignore lint/style/noNonNullAssertion: <explanation>
									Number.parseFloat(report.labaBerjalan!),
								)}
								.
							</p>
						</CardContent>
						<CardFooter className="flex justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
									<AvatarImage src={report.authorImage!} />
									<AvatarFallback className="uppercase">
										{report.author ? report.author.slice(0, 2) : "N/A"}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<p className="text-sm">{report.author ?? "N/A"}</p>
									<p className="font-semibold text-sm">Author</p>
								</div>
							</div>

							<Link
								className="flex gap-0.5 underline"
								href={`/app/report/${report.financeId}`}
							>
								Selengkapnya <ArrowRight />
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
