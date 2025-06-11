import { relations, sql } from "drizzle-orm";
import { createTable } from "./_table";

import { companies, companyHolders } from "./company";

export const finances = createTable("finance", (d) => ({
	id: d.integer().primaryKey().generatedByDefaultAsIdentity(),

	// Neraca - Assets
	kasDanBank: d.numeric({ precision: 100, scale: 2 }).default("0"),
	piutangUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	persediaan: d.numeric({ precision: 100, scale: 2 }).default("0"),
	uangMukaPembelian: d.numeric({ precision: 100, scale: 2 }).default("0"),
	investasiJangkaPendek: d.numeric({ precision: 100, scale: 2 }).default("0"),
	peralatanUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	kendaraanUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bangunanUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	tanah: d.numeric({ precision: 100, scale: 2 }).default("0"),
	akumulasiPenyusutan: d.numeric({ precision: 100, scale: 2 }).default("0"),
	asetTakBerwujud: d.numeric({ precision: 100, scale: 2 }).default("0"),
	investasiJangkaPanjang: d.numeric({ precision: 100, scale: 2 }).default("0"),

	// Neraca - Liabilities & Equity
	utangUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	utangBankPendek: d.numeric({ precision: 100, scale: 2 }).default("0"),
	utangPajak: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanYangHarusDibayar: d.numeric({ precision: 100, scale: 2 }).default("0"),
	utangBankPanjang: d.numeric({ precision: 100, scale: 2 }).default("0"),
	utangLeasing: d.numeric({ precision: 100, scale: 2 }).default("0"),
	modalAwal: d.numeric({ precision: 100, scale: 2 }).default("0"),
	labaDitahan: d.numeric({ precision: 100, scale: 2 }).default("0"),
	labaBerjalan: d.numeric({ precision: 100, scale: 2 }).default("0"),
	prive: d.numeric({ precision: 100, scale: 2 }).default("0"),

	// Laba Rugi
	pendapatanUsaha: d.numeric({ precision: 100, scale: 2 }).default("0"),
	hpp: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanGaji: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanSewa: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanListrik: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanTransportasi: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanPromosi: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanPenyusutan: d.numeric({ precision: 100, scale: 2 }).default("0"),
	pendapatanBunga: d.numeric({ precision: 100, scale: 2 }).default("0"),
	bebanBungaPinjaman: d.numeric({ precision: 100, scale: 2 }).default("0"),

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

export const financeRelations = relations(finances, ({ many }) => ({
	holders: many(companyHolders),
	companies: many(companies),
}));
