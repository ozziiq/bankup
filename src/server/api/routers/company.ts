import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { companies, companyHolders, users } from "@/server/db/_main-schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const companyRouter = createTRPCRouter({
	completeCreateNewCompanyBoarding: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				type: z.enum(["retail"]),
				literacy: z.enum(["beginner", "intermediate", "professional"]),
			}),
		)
		.mutation(({ ctx, input }) =>
			ctx.db.transaction(async (tx) => {
				if (!ctx.session.user)
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Anda harus login terlebih dahulu",
					});

				if (ctx.session.user.literacyLevel)
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Anda sudah melalui tahap pertanyaan literasi keuangan.",
					});

				const insertedCompany = await tx
					.insert(companies)
					.values({
						name: input.name,
						type: input.type,
					})
					.returning();

				await tx.insert(companyHolders).values({
					// biome-ignore lint/style/noNonNullAssertion: it should provide the id because the .returning() function
					companyId: insertedCompany[0]!.id,
					userId: ctx.session.user.id,
					approved: true,
					approvedAt: new Date(),
				});

				await tx
					.update(users)
					.set({
						literacyLevel: input.literacy,
					})
					.where(eq(users.id, ctx.session.user.id));
			}),
		),
});
