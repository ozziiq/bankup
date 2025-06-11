import type { Metadata } from "next";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { companyHolders, finances, users } from "@/server/db/_main-schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
	title: "Beranda",
};

export default async function AppMainPage() {
	const userData = await auth();

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const currentUserId = userData!.user.id;

	const result = await db
		.select({
			labaBerjalan: finances.labaBerjalan,
		})
		.from(finances)
		.innerJoin(companyHolders, eq(finances.companyId, companyHolders.companyId))
		.innerJoin(users, eq(users.id, companyHolders.userId))
		.where(eq(companyHolders.userId, currentUserId));

	const akumulasiPendapatan = result
		.map((d) => (d.labaBerjalan ? Number.parseFloat(d.labaBerjalan) : 0))
		.reduce((curr, acc) => curr + acc);
	const pendapatan = new Intl.NumberFormat("id-ID").format(akumulasiPendapatan);

	return (
		<div className="space-y-1">
			<h2 className="scroll-m-20 pb-2 font-semibold text-3xl tracking-tight first:mt-0">
				Dashboard
			</h2>

			<div className="flex w-full flex-col gap-4 md:flex-row">
				<Card className="w-full border-t-4 border-t-teal-600">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Total Pendapatan</CardTitle>
						<CardDescription>
							Pendapatan yang baru masuk namun belum dikurangi beban usaha.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-center font-semibold text-3xl text-teal-600">
							Rp {pendapatan}
						</p>
					</CardContent>
					<CardFooter className="justify-center">
						<p>Bulan ini</p>
					</CardFooter>
				</Card>

				<Card className="w-full border-t-4 border-t-orange-600">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Total Beban</CardTitle>
						<CardDescription>
							Seluruh beban usaha seperti gaji karyawan, ongkos kirim, dan
							lain-lain.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-center font-semibold text-3xl text-orange-600">
							Rp 0
						</p>
					</CardContent>
					<CardFooter className="justify-center">
						<p>Bulan ini</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
