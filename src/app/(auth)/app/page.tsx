import type { Metadata } from "next";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
	title: "Beranda",
};

export default function AppMainPage() {
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
							Rp 0
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
