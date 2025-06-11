import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { companyHolders, finances } from "@/server/db/_main-schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

const BeginnerInput = z.object({
	pendapatan: z.number(),
	gaji: z.number(),
	listrik: z.number(),
	sewa: z.number(),
	bahanBaku: z.number(),
	kas: z.number(),
	piutang: z.number(),
	persediaan: z.number(),
	asetTetap: z.number(),
	utangUsaha: z.number(),
	pinjaman: z.number(),
	modalAwal: z.number(),
	investasiTambahan: z.number(),
});

export const financeRouter = createTRPCRouter({
	saveBeginnerReport: protectedProcedure
		.input(BeginnerInput)
		.mutation(async ({ input, ctx }) => {
			const companyMetadata = await ctx.db.query.companyHolders.findFirst({
				where: eq(companyHolders.userId, ctx.session.user.id),
			});

			if (!companyMetadata)
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "How?",
				});

			const {
				pendapatan,
				gaji,
				listrik,
				sewa,
				bahanBaku,
				kas,
				piutang,
				persediaan,
				asetTetap,
				utangUsaha,
				pinjaman,
				modalAwal,
				investasiTambahan,
			} = input;

			// Calculate derived values
			const labaBerjalan = pendapatan - (gaji + listrik + sewa + bahanBaku);

			return await ctx.db
				.insert(finances)
				.values({
					// Income Statement
					pendapatanUsaha: pendapatan.toString(),
					hpp: bahanBaku.toString(),
					bebanGaji: gaji.toString(),
					bebanListrik: listrik.toString(),
					bebanSewa: sewa.toString(),

					// Balance Sheet - Assets
					kasDanBank: kas.toString(),
					piutangUsaha: piutang.toString(),
					persediaan: persediaan.toString(),
					peralatanUsaha: asetTetap.toString(),

					// Balance Sheet - Liabilities
					utangUsaha: utangUsaha.toString(),
					utangBankPendek: pinjaman.toString(),

					// Equity
					modalAwal: modalAwal.toString(),
					labaDitahan: investasiTambahan.toString(),
					labaBerjalan: labaBerjalan.toString(),

					// Metadata
					companyId: companyMetadata.companyId,
					createdBy: companyMetadata.id,
				})
				.returning();
		}),
});
