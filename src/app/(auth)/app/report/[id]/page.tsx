import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { companyHolders, finances, users } from "@/server/db/_main-schema";
import { and, eq } from "drizzle-orm";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
	FiBarChart2,
	FiCreditCard,
	FiFile,
	FiHelpCircle,
	FiTrendingUp,
} from "react-icons/fi";

import { calculateResults, formatIDR } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Rincian Laporan Keuangan",
};

export default async function DetailedTransactionReportPage({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id: _id } = await params;
	const id = Number.parseInt(_id);

	if (Number.isNaN(id)) redirect("/app/report");

	const userData = await auth();

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const currentUserId = userData!.user.id;

	const result = await db
		.select({
			pendapatanUsaha: finances.pendapatanUsaha,
			hpp: finances.hpp,
			bebanGaji: finances.bebanGaji,
			bebanListrik: finances.bebanListrik,
			bebanSewa: finances.bebanSewa,

			// Balance Sheet - Assets
			kasDanBank: finances.kasDanBank,
			piutangUsaha: finances.piutangUsaha,
			persediaan: finances.persediaan,
			peralatanUsaha: finances.peralatanUsaha,

			// Balance Sheet - Liabilities
			utangUsaha: finances.utangUsaha,
			utangBankPendek: finances.utangBankPendek,

			// Equity
			modalAwal: finances.modalAwal,
			labaDitahan: finances.labaDitahan,
			labaBerjalan: finances.labaBerjalan,

			// Metadata
			financeId: finances.id,
			author: users.name,
			authorImage: users.image,
			createdAt: finances.createdAt,
		})
		.from(finances)
		.innerJoin(companyHolders, eq(finances.companyId, companyHolders.companyId))
		.innerJoin(users, eq(users.id, companyHolders.userId))
		.where(and(eq(companyHolders.userId, currentUserId), eq(finances.id, id)));

	const data = result[0];

	if (!data) redirect("/app/report");

	const realResult = calculateResults({
		pendapatan: data.pendapatanUsaha
			? Number.parseFloat(data.pendapatanUsaha)
			: 0,
		gaji: data.bebanGaji ? Number.parseFloat(data.bebanGaji) : 0,
		listrik: data.bebanListrik ? Number.parseFloat(data.bebanListrik) : 0,
		sewa: data.bebanSewa ? Number.parseFloat(data.bebanSewa) : 0,
		bahanBaku: data.hpp ? Number.parseFloat(data.hpp) : 0,
		kas: data.kasDanBank ? Number.parseFloat(data.kasDanBank) : 0,
		piutang: data.piutangUsaha ? Number.parseFloat(data.piutangUsaha) : 0,
		persediaan: data.persediaan ? Number.parseFloat(data.persediaan) : 0,
		asetTetap: data.peralatanUsaha ? Number.parseFloat(data.peralatanUsaha) : 0,
		utangUsaha: data.utangUsaha ? Number.parseFloat(data.utangUsaha) : 0,
		pinjaman: data.utangBankPendek
			? Number.parseFloat(data.utangBankPendek)
			: 0,
		modalAwal: data.modalAwal ? Number.parseFloat(data.modalAwal) : 0,
		investasiTambahan: data.labaDitahan
			? Number.parseFloat(data.labaDitahan)
			: 0,
	});

	return (
		<Card className="overflow-hidden rounded-xl shadow-lg">
			<CardHeader>
				<CardTitle>Laporan Keuangan #{data.financeId}</CardTitle>
				<CardDescription>
					{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
					{data.createdAt!.toLocaleString("id-ID")}
				</CardDescription>
				<CardAction>
					<div className="flex items-center md:gap-2">
						<Avatar>
							{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
							<AvatarImage src={data.authorImage!} />
							<AvatarFallback className="uppercase">
								{data.author ? data.author.slice(0, 2) : "N/A"}
							</AvatarFallback>
						</Avatar>
						<div className="hidden md:flex md:flex-col">
							<p className="text-sm">{data.author ?? "N/A"}</p>
							<p className="font-semibold text-sm">Author</p>
						</div>
					</div>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="animate-fade-in">
					<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
						<CardContent className="p-4">
							<div className="mb-2 flex items-center gap-2 text-teal-600">
								<FiTrendingUp className="h-5 w-5" />
								<span className="font-semibold">Laba Bersih</span>
							</div>
							<div className="mb-2 font-bold text-2xl text-gray-800">
								{formatIDR(realResult.labaBersih)}
							</div>
							<p className="text-gray-600 text-sm">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1 underline decoration-dotted">
											<span>Laba Bersih</span>
											<FiHelpCircle className="h-4 w-4" />
										</TooltipTrigger>
										<TooltipContent>
											<p>Pendapatan dikurangi semua beban usaha</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<span> = Pendapatan - Beban</span>
							</p>
						</CardContent>
					</Card>

					<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
						<CardContent className="p-4">
							<div className="mb-2 flex items-center gap-2 text-teal-600">
								<FiBarChart2 className="h-5 w-5" />
								<span className="font-semibold">Neraca</span>
							</div>
							<div className="mb-2 font-bold text-2xl text-gray-800">
								{formatIDR(realResult.totalAset)} ={" "}
								{formatIDR(realResult.totalUtang + realResult.totalModal)}
								{realResult.neraca !== 0 && (
									<span className="ml-2 text-red-500 text-sm">
										(Selisih: {formatIDR(realResult.neraca)})
									</span>
								)}
							</div>
							<p className="text-gray-600 text-sm">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="flex items-center gap-1 underline decoration-dotted">
											<span>Neraca</span>
											<FiHelpCircle className="h-4 w-4" />
										</TooltipTrigger>
										<TooltipContent>
											<p>Aset harus sama dengan jumlah Utang dan Modal</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<span> = Aset = Utang + Modal</span>
							</p>
						</CardContent>
					</Card>

					<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
						<CardContent className="p-4">
							<div className="mb-2 flex items-center gap-2 text-teal-600">
								<FiCreditCard className="h-5 w-5" />
								<span className="font-semibold">Arus Kas</span>
							</div>
							<div className="mb-2 font-bold text-gray-800 text-xl">
								<div>Operasi: {formatIDR(realResult.arusKasOperasi)}</div>
								<div>
									Investasi:
									{formatIDR(realResult.arusKasInvestasi)}
								</div>
								<div>
									Pendanaan:
									{formatIDR(realResult.arusKasPendanaan)}
								</div>
							</div>
							<p className="text-gray-600 text-sm">
								Ringkasan arus kas dari operasi, investasi, dan pendanaan
							</p>
						</CardContent>
					</Card>

					<div className="mb-8 text-gray-600 text-sm">
						<p>
							Laporan disusun berdasarkan{" "}
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="inline-flex items-center gap-1 underline decoration-dotted">
										<span>SAK EMKM</span>
										<FiHelpCircle className="h-4 w-4" />
									</TooltipTrigger>
									<TooltipContent>
										<p>
											Standar Akuntansi Keuangan untuk Entitas Mikro, Kecil, dan
											Menengah
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							.
						</p>
					</div>

					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Button asChild className="bg-teal-600 hover:bg-teal-700">
							<Link target="_blank" href={`/api/pdf-report/${data.financeId}`}>
								<FiFile className="mr-2" /> Unduh PDF
							</Link>
						</Button>

						<Button asChild variant="outline">
							<Link href="/app/transaction">Buat Laporan Baru</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
