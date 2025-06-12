// @ts-nocheck
const pdfMake = require("pdfmake");
const path = require("node:path");

function formatIDR(value) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(value);
}

process.stdin.on("data", (jsonData) => {
	try {
		const data = JSON.parse(jsonData);
		const printer = new pdfMake({
			Roboto: {
				normal: path.join(__dirname, "./Roboto-Regular.ttf"),
				bold: path.join(__dirname, "./Roboto-Medium.ttf"),
				italics: path.join(__dirname, "./Roboto-Italic.ttf"),
				bolditalics: path.join(__dirname, "./Roboto-MediumItalic.ttf"),
			},
		});

		const docDefinition = {
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
		};

		const pdfDoc = printer.createPdfKitDocument(docDefinition);

		const chunks = [];
		pdfDoc.on("data", (chunk) => chunks.push(chunk));
		pdfDoc.on("end", () => {
			const pdfBuffer = Buffer.concat(chunks);
			process.stdout.write(pdfBuffer);
		});

		pdfDoc.end();
	} catch (error) {
		console.error("PDF generation error:", error);
		process.exit(1);
	}
});
