// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// // @ts-ignore
// pdfMake.vfs = pdfFonts;

import { formatIDR } from "@/lib/utils";

export type NumericFields = {
	kasDanBank: number;
	piutangUsaha: number;
	persediaan: number;
	uangMukaPembelian: number;
	investasiJangkaPendek: number;
	peralatanUsaha: number;
	kendaraanUsaha: number;
	bangunanUsaha: number;
	tanah: number;
	akumulasiPenyusutan: number;
	asetTakBerwujud: number;
	investasiJangkaPanjang: number;
	utangUsaha: number;
	utangBankPendek: number;
	utangPajak: number;
	bebanYangHarusDibayar: number;
	utangBankPanjang: number;
	utangLeasing: number;
	modalAwal: number;
	labaDitahan: number;
	labaBerjalan: number;
	prive: number;
	pendapatanUsaha: number;
	hpp: number;
	bebanGaji: number;
	bebanSewa: number;
	bebanListrik: number;
	bebanTransportasi: number;
	bebanPromosi: number;
	bebanPenyusutan: number;
	pendapatanBunga: number;
	bebanBungaPinjaman: number;
};

const numericKeys = [
	"kasDanBank",
	"piutangUsaha",
	"persediaan",
	"uangMukaPembelian",
	"investasiJangkaPendek",
	"peralatanUsaha",
	"kendaraanUsaha",
	"bangunanUsaha",
	"tanah",
	"akumulasiPenyusutan",
	"asetTakBerwujud",
	"investasiJangkaPanjang",
	"utangUsaha",
	"utangBankPendek",
	"utangPajak",
	"bebanYangHarusDibayar",
	"utangBankPanjang",
	"utangLeasing",
	"modalAwal",
	"labaDitahan",
	"labaBerjalan",
	"prive",
	"pendapatanUsaha",
	"hpp",
	"bebanGaji",
	"bebanSewa",
	"bebanListrik",
	"bebanTransportasi",
	"bebanPromosi",
	"bebanPenyusutan",
	"pendapatanBunga",
	"bebanBungaPinjaman",
] as const;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function convertNumericFields<T extends Record<string, any>>(
	data: T,
): Omit<T, keyof NumericFields> & NumericFields {
	return {
		...data,
		...(Object.fromEntries(
			numericKeys.map((key) => [
				key,
				data[key] ? Number.parseFloat(data[key]) : 0,
			]),
		) as NumericFields),
	};
}

export function hitungNeraca(neraca: {
	kasDanBank: number;
	piutangUsaha: number;
	persediaan: number;
	uangMukaPembelian: number;
	investasiJangkaPendek: number;
	peralatanUsaha: number;
	kendaraanUsaha: number;
	bangunanUsaha: number;
	tanah: number;
	akumulasiPenyusutan: number;
	asetTakBerwujud: number;
	investasiJangkaPanjang: number;
	utangUsaha: number;
	utangBankPendek: number;
	utangPajak: number;
	bebanYangHarusDibayar: number;
	utangBankPanjang: number;
	utangLeasing: number;
	modalAwal: number;
	labaDitahan: number;
	labaBerjalan: number;
	prive: number;
}) {
	const totalAsetLancar =
		neraca.kasDanBank +
		neraca.piutangUsaha +
		neraca.persediaan +
		neraca.uangMukaPembelian +
		neraca.investasiJangkaPendek;

	const totalAsetTetap =
		neraca.peralatanUsaha +
		neraca.kendaraanUsaha +
		neraca.bangunanUsaha +
		neraca.tanah -
		neraca.akumulasiPenyusutan;

	const totalAset =
		totalAsetLancar +
		totalAsetTetap +
		neraca.asetTakBerwujud +
		neraca.investasiJangkaPanjang;

	const totalLiabilitasJangkaPendek =
		neraca.utangUsaha +
		neraca.utangBankPendek +
		neraca.utangPajak +
		neraca.bebanYangHarusDibayar;

	const totalLiabilitasJangkaPanjang =
		neraca.utangBankPanjang + neraca.utangLeasing;

	const totalLiabilitas =
		totalLiabilitasJangkaPendek + totalLiabilitasJangkaPanjang;

	const totalEkuitas =
		neraca.modalAwal + neraca.labaDitahan + neraca.labaBerjalan - neraca.prive;

	const seimbang =
		Math.abs(totalAset - (totalLiabilitas + totalEkuitas)) < 0.01;

	return {
		...neraca,
		totalAsetLancar,
		totalAsetTetap,
		totalAset,
		totalLiabilitasJangkaPendek,
		totalLiabilitasJangkaPanjang,
		totalLiabilitas,
		totalEkuitas,
		seimbang,
	};
}

export function hitungLabaRugi(labaRugi: {
	pendapatanUsaha: number;
	hpp: number;
	bebanGaji: number;
	bebanSewa: number;
	bebanListrik: number;
	bebanTransportasi: number;
	bebanPromosi: number;
	bebanPenyusutan: number;
	pendapatanBunga: number;
	bebanBungaPinjaman: number;
}) {
	const labaKotor = labaRugi.pendapatanUsaha - labaRugi.hpp;
	const labaUsaha =
		labaKotor -
		(labaRugi.bebanGaji +
			labaRugi.bebanSewa +
			labaRugi.bebanListrik +
			labaRugi.bebanTransportasi +
			labaRugi.bebanPromosi +
			labaRugi.bebanPenyusutan);
	const labaSebelumPajak =
		labaUsaha + labaRugi.pendapatanBunga - labaRugi.bebanBungaPinjaman;
	const pajak = labaSebelumPajak * 0.25; // Asumsi tarif pajak 25%
	const labaBersih = labaSebelumPajak - pajak;

	return {
		...labaRugi,
		labaKotor,
		labaUsaha,
		labaSebelumPajak,
		pajak,
		labaBersih,
	};
}

export function processFinanceData(data: {
	neraca: ReturnType<typeof hitungNeraca>;
	labaRugi: ReturnType<typeof hitungLabaRugi>;
	reportId: number;
	createdAt: Date;
	usahaName: string;
}) {
	const neraca = hitungNeraca(data.neraca);
	const labaRugi = hitungLabaRugi(data.labaRugi);

	return {
		metadata: {
			reportId: data.reportId,
			createdAt: data.createdAt,
			usahaName: data.usahaName || "UMKM",
		},
		neraca,
		labaRugi,
	};
}

export function genPDF(data: ReturnType<typeof processFinanceData>) {
	// @ts-ignore
	const printer = new pdfMake({});

	return printer.createPdfKitDocument({
		content: [
			{
				text: `Laporan Keuangan ${data.metadata.usahaName}`,
				style: "header",
			},
			{ text: `ID Laporan: ${data.metadata.reportId}`, style: "subheader" },
			{
				text: `Tanggal: ${new Date(
					data.metadata.createdAt,
				).toLocaleDateString()}`,
				style: "subheader",
			},

			{ text: "\nNeraca Keuangan", style: "sectionHeader" },
			{
				table: {
					widths: ["*", "*"],
					body: [
						["Aset", ""],
						["Kas dan Bank", formatIDR(data.neraca.kasDanBank)],
						["Piutang Usaha", formatIDR(data.neraca.piutangUsaha)],
						["Persediaan", formatIDR(data.neraca.persediaan)],
						["Total Aset Lancar", formatIDR(data.neraca.totalAsetLancar)],
						["", ""],
						["Peralatan Usaha", formatIDR(data.neraca.peralatanUsaha)],
						[
							"Akumulasi Penyusutan",
							formatIDR(-data.neraca.akumulasiPenyusutan),
						],
						["Total Aset Tetap", formatIDR(data.neraca.totalAsetTetap)],
						["Total Aset", formatIDR(data.neraca.totalAset)],
						["", ""],
						["Liabilitas", ""],
						["Utang Usaha", formatIDR(data.neraca.utangUsaha)],
						[
							"Total Liabilitas Jangka Pendek",
							formatIDR(data.neraca.totalLiabilitasJangkaPendek),
						],
						[
							"Total Liabilitas Jangka Panjang",
							formatIDR(data.neraca.totalLiabilitasJangkaPanjang),
						],
						["Total Liabilitas", formatIDR(data.neraca.totalLiabilitas)],
						["", ""],
						["Ekuitas", ""],
						["Modal Awal", formatIDR(data.neraca.modalAwal)],
						["Laba Ditahan", formatIDR(data.neraca.labaDitahan)],
						["Laba Berjalan", formatIDR(data.neraca.labaBerjalan)],
						["Prive", formatIDR(-data.neraca.prive)],
						["Total Ekuitas", formatIDR(data.neraca.totalEkuitas)],
						["", ""],
						[
							"Keseimbangan",
							data.neraca.seimbang ? "Seimbang" : "Tidak Seimbang",
						],
					],
				},
			},

			{ text: "\nLaba Rugi", style: "sectionHeader" },
			{
				table: {
					widths: ["*", "*"],
					body: [
						["Pendapatan Usaha", formatIDR(data.labaRugi.pendapatanUsaha)],
						["HPP", formatIDR(-data.labaRugi.hpp)],
						["Laba Kotor", formatIDR(data.labaRugi.labaKotor)],
						["", ""],
						["Beban Gaji", formatIDR(-data.labaRugi.bebanGaji)],
						["Beban Sewa", formatIDR(-data.labaRugi.bebanSewa)],
						["Beban Listrik", formatIDR(-data.labaRugi.bebanListrik)],
						[
							"Total Beban Usaha",
							formatIDR(
								-(
									data.labaRugi.bebanGaji +
									data.labaRugi.bebanSewa +
									data.labaRugi.bebanListrik +
									data.labaRugi.bebanTransportasi +
									data.labaRugi.bebanPromosi +
									data.labaRugi.bebanPenyusutan
								),
							),
						],
						["Laba Usaha", formatIDR(data.labaRugi.labaUsaha)],
						["", ""],
						["Pendapatan Bunga", formatIDR(data.labaRugi.pendapatanBunga)],
						[
							"Beban Bunga Pinjaman",
							formatIDR(-data.labaRugi.bebanBungaPinjaman),
						],
						["Laba Sebelum Pajak", formatIDR(data.labaRugi.labaSebelumPajak)],
						["Pajak", formatIDR(-data.labaRugi.pajak)],
						["Laba Bersih", formatIDR(data.labaRugi.labaBersih)],
					],
				},
			},
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
				alignment: "center",
				margin: [0, 0, 0, 10],
			},
			subheader: {
				fontSize: 12,
				alignment: "center",
				margin: [0, 0, 0, 10],
			},
			sectionHeader: {
				fontSize: 14,
				bold: true,
				margin: [0, 10, 0, 5],
			},
		},
	});
}
