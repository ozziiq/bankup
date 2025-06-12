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

		// Calculate total expenses
		const totalBebanUsaha =
			data.labaRugi.bebanGaji +
			data.labaRugi.bebanSewa +
			data.labaRugi.bebanListrik +
			data.labaRugi.bebanTransportasi +
			data.labaRugi.bebanPromosi +
			data.labaRugi.bebanPenyusutan;

		const docDefinition = {
			pageMargins: [40, 60, 40, 60], // Added page margins
			content: [
				{
					text: `Laporan Keuangan ${data.metadata.usahaName}`,
					style: "header",
				},
				{
					text: `ID Laporan: ${data.metadata.reportId}`,
					style: "subheader",
					margin: [0, 0, 0, 2], // Reduced bottom margin
				},
				{
					text: `Tanggal: ${new Date(
						data.metadata.createdAt,
					).toLocaleDateString("id-ID", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}`,
					style: "subheader",
					margin: [0, 0, 0, 10], // Bottom margin for spacing
				},

				{ text: "Neraca Keuangan", style: "sectionHeader" },
				{
					table: {
						widths: ["70%", "30%"],
						body: [
							// ASET SECTION
							[{ text: "ASET", style: "sectionTitle", colSpan: 2 }, {}],
							[
								{ text: "Aset Lancar", style: "subsectionTitle", colSpan: 2 },
								{},
							],
							[
								"Kas dan Bank",
								{ text: formatIDR(data.neraca.kasDanBank), alignment: "right" },
							],
							[
								"Piutang Usaha",
								{
									text: formatIDR(data.neraca.piutangUsaha),
									alignment: "right",
								},
							],
							[
								"Persediaan",
								{ text: formatIDR(data.neraca.persediaan), alignment: "right" },
							],
							[
								{
									text: "Total Aset Lancar",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.neraca.totalAsetLancar),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// ASET TETAP
							[
								{
									text: "Aset Tidak Lancar",
									style: "subsectionTitle",
									colSpan: 2,
								},
								{},
							],
							[
								"Peralatan Usaha",
								{
									text: formatIDR(data.neraca.peralatanUsaha),
									alignment: "right",
								},
							],
							[
								"Akumulasi Penyusutan",
								{
									text: formatIDR(-data.neraca.akumulasiPenyusutan),
									alignment: "right",
								},
							],
							[
								{
									text: "Total Aset Tetap",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.neraca.totalAsetTetap),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// TOTAL ASET
							[
								{
									text: "TOTAL ASET",
									style: "sectionTotal",
									border: [false, false, false, false],
								},
								{
									text: formatIDR(data.neraca.totalAset),
									style: "sectionTotal",
									border: [false, false, false, false],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 15 }, {}],

							// LIABILITAS SECTION
							[{ text: "LIABILITAS", style: "sectionTitle", colSpan: 2 }, {}],
							[
								{
									text: "Liabilitas Jangka Pendek",
									style: "subsectionTitle",
									colSpan: 2,
								},
								{},
							],
							[
								"Utang Usaha",
								{ text: formatIDR(data.neraca.utangUsaha), alignment: "right" },
							],
							[
								{
									text: "Total Liabilitas Jangka Pendek",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.neraca.totalLiabilitasJangkaPendek),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// LIABILITAS JANGKA PANJANG
							[
								{
									text: "Liabilitas Jangka Panjang",
									style: "subsectionTitle",
									colSpan: 2,
								},
								{},
							],
							[
								{
									text: "Total Liabilitas Jangka Panjang",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.neraca.totalLiabilitasJangkaPanjang),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// TOTAL LIABILITAS
							[
								{
									text: "TOTAL LIABILITAS",
									style: "sectionTotal",
									border: [false, false, false, false],
								},
								{
									text: formatIDR(data.neraca.totalLiabilitas),
									style: "sectionTotal",
									border: [false, false, false, false],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 15 }, {}],

							// EKUITAS SECTION
							[{ text: "EKUITAS", style: "sectionTitle", colSpan: 2 }, {}],
							[
								"Modal Awal",
								{ text: formatIDR(data.neraca.modalAwal), alignment: "right" },
							],
							[
								"Laba Ditahan",
								{
									text: formatIDR(data.neraca.labaDitahan),
									alignment: "right",
								},
							],
							[
								"Laba Berjalan",
								{
									text: formatIDR(data.neraca.labaBerjalan),
									alignment: "right",
								},
							],
							[
								"Prive",
								{ text: formatIDR(-data.neraca.prive), alignment: "right" },
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// TOTAL EKUITAS
							[
								{
									text: "TOTAL EKUITAS",
									style: "sectionTotal",
									border: [false, false, false, false],
								},
								{
									text: formatIDR(data.neraca.totalEkuitas),
									style: "sectionTotal",
									border: [false, false, false, false],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 15 }, {}],

							// BALANCE CHECK
							[
								{
									text: "KESEIMBANGAN",
									style: "balanceTitle",
									border: [false, false, false, true],
								},
								{
									text: data.neraca.seimbang ? "SEIMBANG" : "TIDAK SEIMBANG",
									style: data.neraca.seimbang ? "balanceGood" : "balanceBad",
									border: [false, false, false, true],
									alignment: "right",
								},
							],
						],
					},
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
						paddingTop: () => 5,
						paddingBottom: () => 5,
						hLineWidth: () => 0, // Remove all horizontal lines
						vLineWidth: () => 0, // Remove all vertical lines
					},
					margin: [0, 0, 0, 15], // Bottom margin after table
				},

				{ text: "Laba Rugi", style: "sectionHeader" },
				{
					table: {
						widths: ["70%", "30%"],
						body: [
							// PENDAPATAN
							[{ text: "PENDAPATAN", style: "sectionTitle", colSpan: 2 }, {}],
							[
								"Pendapatan Usaha",
								{
									text: formatIDR(data.labaRugi.pendapatanUsaha),
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// HPP
							[
								{
									text: "Harga Pokok Penjualan",
									style: "subsectionTitle",
									colSpan: 2,
								},
								{},
							],
							[
								"HPP",
								{ text: formatIDR(-data.labaRugi.hpp), alignment: "right" },
							],
							[
								{
									text: "LABA KOTOR",
									style: "sectionTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.labaRugi.labaKotor),
									style: "sectionTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 15 }, {}],

							// BEBAN USAHA
							[{ text: "BEBAN USAHA", style: "sectionTitle", colSpan: 2 }, {}],
							[
								"Beban Gaji",
								{
									text: formatIDR(-data.labaRugi.bebanGaji),
									alignment: "right",
								},
							],
							[
								"Beban Sewa",
								{
									text: formatIDR(-data.labaRugi.bebanSewa),
									alignment: "right",
								},
							],
							[
								"Beban Listrik",
								{
									text: formatIDR(-data.labaRugi.bebanListrik),
									alignment: "right",
								},
							],
							[
								"Beban Transportasi",
								{
									text: formatIDR(-data.labaRugi.bebanTransportasi),
									alignment: "right",
								},
							],
							[
								"Beban Promosi",
								{
									text: formatIDR(-data.labaRugi.bebanPromosi),
									alignment: "right",
								},
							],
							[
								"Beban Penyusutan",
								{
									text: formatIDR(-data.labaRugi.bebanPenyusutan),
									alignment: "right",
								},
							],
							[
								{
									text: "TOTAL BEBAN USAHA",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(-totalBebanUsaha),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// LABA USAHA
							[
								{
									text: "LABA USAHA",
									style: "sectionTotal",
									border: [false, false, false, false],
								},
								{
									text: formatIDR(data.labaRugi.labaUsaha),
									style: "sectionTotal",
									border: [false, false, false, false],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 15 }, {}],

							// PENDAPATAN/BEBAN LAIN
							[
								{
									text: "PENDAPATAN/BEBAN LAIN",
									style: "sectionTitle",
									colSpan: 2,
								},
								{},
							],
							[
								"Pendapatan Bunga",
								{
									text: formatIDR(data.labaRugi.pendapatanBunga),
									alignment: "right",
								},
							],
							[
								"Beban Bunga Pinjaman",
								{
									text: formatIDR(-data.labaRugi.bebanBungaPinjaman),
									alignment: "right",
								},
							],
							[
								{
									text: "LABA SEBELUM PAJAK",
									style: "rowTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.labaRugi.labaSebelumPajak),
									style: "rowTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],

							// SPACER ROW
							[{ text: "", colSpan: 2, height: 8 }, {}],

							// PAJAK & LABA BERSIH
							[
								"Pajak",
								{ text: formatIDR(-data.labaRugi.pajak), alignment: "right" },
							],
							[
								{
									text: "LABA BERSIH",
									style: "sectionTotal",
									border: [false, false, false, true],
								},
								{
									text: formatIDR(data.labaRugi.labaBersih),
									style: "sectionTotal",
									border: [false, false, false, true],
									alignment: "right",
								},
							],
						],
					},
					layout: {
						paddingLeft: () => 0,
						paddingRight: () => 0,
						paddingTop: () => 5,
						paddingBottom: () => 5,
						hLineWidth: () => 0,
						vLineWidth: () => 0,
					},
				},
			],
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					alignment: "center",
					margin: [0, 0, 0, 5],
				},
				subheader: {
					fontSize: 12,
					alignment: "center",
					margin: [0, 0, 0, 2],
				},
				sectionHeader: {
					fontSize: 14,
					bold: true,
					margin: [0, 20, 0, 8],
				},
				sectionTitle: {
					bold: true,
					fontSize: 12,
					margin: [0, 5, 0, 5],
				},
				subsectionTitle: {
					bold: true,
					fontSize: 10,
					margin: [0, 8, 0, 3],
				},
				rowTotal: {
					bold: true,
					fontSize: 10,
					margin: [0, 4, 0, 4],
				},
				sectionTotal: {
					bold: true,
					fontSize: 11,
					margin: [0, 5, 0, 5],
				},
				balanceTitle: {
					bold: true,
					fontSize: 11,
					margin: [0, 5, 0, 5],
				},
				balanceGood: {
					bold: true,
					color: "green",
					fontSize: 11,
					margin: [0, 5, 0, 5],
				},
				balanceBad: {
					bold: true,
					color: "red",
					fontSize: 11,
					margin: [0, 5, 0, 5],
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
