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
import {
	companies,
	companyHolders,
	finances,
	users,
} from "@/server/db/_main-schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
	title: "Beranda",
};

export default async function AppMainPage() {
	const userData = await auth();

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const currentUserId = userData!.user.id;

	const companyRaw = await db
		.select({
			name: companies.name,
		})
		.from(companies)
		.innerJoin(companyHolders, eq(companies.id, companyHolders.companyId))
		.where(eq(companyHolders.userId, currentUserId));
	const company = companyRaw[0];

	if (!company) throw new Error("This shouldn't happen");

	const result = await db
		.select({
			labaBerjalan: finances.labaBerjalan,
			hpp: finances.hpp,
			bebanGaji: finances.bebanGaji,
			bebanListrik: finances.bebanListrik,
			bebanSewa: finances.bebanSewa,
		})
		.from(finances)
		.innerJoin(companyHolders, eq(finances.companyId, companyHolders.companyId))
		.innerJoin(users, eq(users.id, companyHolders.userId))
		.where(eq(companyHolders.userId, currentUserId));

	const akumulasiPendapatan = result
		.map((d) => (d.labaBerjalan ? Number.parseFloat(d.labaBerjalan) : 0))
		.reduce((curr, acc) => curr + acc, 0);
	const pendapatan = new Intl.NumberFormat("id-ID").format(akumulasiPendapatan);

	const akumulasiBeban = result
		.map((d) => [
			d.hpp ? Number.parseFloat(d.hpp) : 0,
			d.bebanGaji ? Number.parseFloat(d.bebanGaji) : 0,
			d.bebanListrik ? Number.parseFloat(d.bebanListrik) : 0,
			d.bebanSewa ? Number.parseFloat(d.bebanSewa) : 0,
		])
		.reduce(
			(accOuter, innerArray) =>
				accOuter + innerArray.reduce((accInner, value) => accInner + value, 0),
			0,
		);
	const totalBeban = new Intl.NumberFormat("id-ID").format(akumulasiBeban);

	return (
		<div className="space-y-4">
			<div className="space-y-0.5">
				<h2 className="scroll-m-20 font-semibold text-3xl tracking-tight first:mt-0">
					Dashboard
				</h2>
				<p className="scroll-m-20 tracking-tight">
					Nama Usaha: <b>{company.name}</b>
				</p>
			</div>

			<div className="flex w-full flex-col gap-4 md:flex-row">
				<Card className="w-full border-t-4 border-t-teal-600">
					<CardHeader className="text-center">
						<CardTitle className="text-xl">Total Laba</CardTitle>
						<CardDescription>
							Laba yaitu berupa keuntungan yang usaha anda hasilkan.
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
							Rp {totalBeban}
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
