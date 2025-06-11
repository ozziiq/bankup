import { createTable } from "./_table";

import { users } from "./auth";
import { companies } from "./company";

export const finances = createTable("finance", (d) => ({
	id: d.integer().primaryKey().generatedByDefaultAsIdentity(),

	// Neraca - Assets
	kasDanBank: d
		.numeric("kas_dan_bank", { precision: 100, scale: 2 })
		.default("0"),
	piutangUsaha: d
		.numeric("piutang_usaha", { precision: 100, scale: 2 })
		.default("0"),
	persediaan: d
		.numeric("persediaan", { precision: 100, scale: 2 })
		.default("0"),
	uangMukaPembelian: d
		.numeric("uang_muka_pembelian", { precision: 100, scale: 2 })
		.default("0"),
	investasiJangkaPendek: d
		.numeric("investasi_jangka_pendek", { precision: 100, scale: 2 })
		.default("0"),
	peralatanUsaha: d
		.numeric("peralatan_usaha", { precision: 100, scale: 2 })
		.default("0"),
	kendaraanUsaha: d
		.numeric("kendaraan_usaha", { precision: 100, scale: 2 })
		.default("0"),
	bangunanUsaha: d
		.numeric("bangunan_usaha", { precision: 100, scale: 2 })
		.default("0"),
	tanah: d.numeric("tanah", { precision: 100, scale: 2 }).default("0"),
	akumulasiPenyusutan: d
		.numeric("akumulasi_penyusutan", { precision: 100, scale: 2 })
		.default("0"),
	asetTakBerwujud: d
		.numeric("aset_tak_berwujud", { precision: 100, scale: 2 })
		.default("0"),
	investasiJangkaPanjang: d
		.numeric("investasi_jangka_panjang", { precision: 100, scale: 2 })
		.default("0"),

	// Neraca - Liabilities & Equity
	utangUsaha: d
		.numeric("utang_usaha", { precision: 100, scale: 2 })
		.default("0"),
	utangBankPendek: d
		.numeric("utang_bank_pendek", { precision: 100, scale: 2 })
		.default("0"),
	utangPajak: d
		.numeric("utang_pajak", { precision: 100, scale: 2 })
		.default("0"),
	bebanYangHarusDibayar: d
		.numeric("beban_yang_harus_dibayar", { precision: 100, scale: 2 })
		.default("0"),
	utangBankPanjang: d
		.numeric("utang_bank_panjang", { precision: 100, scale: 2 })
		.default("0"),
	utangLeasing: d
		.numeric("utang_leasing", { precision: 100, scale: 2 })
		.default("0"),
	modalAwal: d.numeric("modal_awal", { precision: 100, scale: 2 }).default("0"),
	labaDitahan: d
		.numeric("laba_ditahan", { precision: 100, scale: 2 })
		.default("0"),
	labaBerjalan: d
		.numeric("laba_berjalan", { precision: 100, scale: 2 })
		.default("0"),
	prive: d.numeric("prive", { precision: 100, scale: 2 }).default("0"),

	// Laba Rugi
	pendapatanUsaha: d
		.numeric("pendapatan_usaha", { precision: 100, scale: 2 })
		.default("0"),
	hpp: d.numeric("hpp", { precision: 100, scale: 2 }).default("0"),
	bebanGaji: d.numeric("beban_gaji", { precision: 100, scale: 2 }).default("0"),
	bebanSewa: d.numeric("beban_sewa", { precision: 100, scale: 2 }).default("0"),
	bebanListrik: d
		.numeric("beban_listrik", { precision: 100, scale: 2 })
		.default("0"),
	bebanTransportasi: d
		.numeric("beban_transportasi", { precision: 100, scale: 2 })
		.default("0"),
	bebanPromosi: d
		.numeric("beban_promosi", { precision: 100, scale: 2 })
		.default("0"),
	bebanPenyusutan: d
		.numeric("beban_penyusutan", { precision: 100, scale: 2 })
		.default("0"),
	pendapatanBunga: d
		.numeric("pendapatan_bunga", { precision: 100, scale: 2 })
		.default("0"),
	bebanBungaPinjaman: d
		.numeric("beban_bunga_pinjaman", { precision: 100, scale: 2 })
		.default("0"),

	// CALK
	kebijakanAkuntansi: d.text("kebijakan_akuntansi").default(""),
	penjelasanAset: d.text("penjelasan_aset").default(""),
	penjelasanUtang: d.text("penjelasan_utang").default(""),
	informasiTambahan: d.text("informasi_tambahan").default(""),

	// Detailed information
	companyId: d
		.varchar({ length: 255 })
		.notNull()
		.references(() => companies.id),
	createdBy: d
		.integer()
		.notNull()
		.references(() => companyHolders.id),
	createdAt: d
		.timestamp("created_at", { mode: "date", withTimezone: true })
		.default(sql`CURRENT_TIMESTAMP`),
}));
