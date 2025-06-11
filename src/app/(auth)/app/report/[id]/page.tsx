import { Card, CardContent } from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { redirect } from "next/navigation";
import {
	FiBarChart2,
	FiCreditCard,
	FiHelpCircle,
	FiTrendingUp,
} from "react-icons/fi";

export default async function DetailedTransactionReportPage({
	params,
}: { params: { id: string } }) {
	const { id: _id } = await params;
	const id = Number.parseInt(_id);

	if (Number.isNaN(id)) redirect("/app/report");

	return (
		<Card className="overflow-hidden rounded-xl shadow-lg">
			<CardContent>
				<div className="animate-fade-in">
					<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
						<CardContent className="p-4">
							<div className="mb-2 flex items-center gap-2 text-teal-600">
								<FiTrendingUp className="h-5 w-5" />
								<span className="font-semibold">Laba Bersih</span>
							</div>
							<div className="mb-2 font-bold text-2xl text-gray-800">
								{/* {formatIDR(results.labaBersih)} */}
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
								{/* {formatIDR(results.totalAset)} ={" "}
                    {formatIDR(results.totalUtang + results.totalModal)}
                    {results.neraca !== 0 && (
                        <span className="ml-2 text-red-500 text-sm">
                            (Selisih: {formatIDR(results.neraca)})
                        </span>
                    )} */}
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
								{/* <div>Operasi: {formatIDR(results.arusKasOperasi)}</div> */}
								<div>Operasi: </div>
								<div>
									Investasi:
									{/* {formatIDR(results.arusKasInvestasi)} */}
								</div>
								<div>
									Pendanaan:
									{/* {formatIDR(results.arusKasPendanaan)} */}
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

					{/* <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="bg-teal-600 hover:bg-teal-700">
                <FiFile className="mr-2" /> Unduh PDF
            </Button>
            <Button
            variant="outline"
            className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
                <FiFilePlus className="mr-2" /> Unduh Excel
            </Button>
            <Button variant="outline" onClick={resetForm}>
                Buat Laporan Baru
                </Button>
                </div> */}
				</div>
			</CardContent>
		</Card>
	);
}
