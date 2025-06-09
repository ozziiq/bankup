import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { createTable } from "./_table";

import { users } from "./auth";

export const companyTypeEnum = pgEnum("companyType", ["retail"]);

export const companies = createTable("company", (d) => ({
	id: d
		.varchar({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: d.varchar({ length: 256 }).notNull(),
	type: companyTypeEnum().notNull(),
}));

export const companyRelations = relations(companies, ({ many }) => ({
	holder: many(companyHolders),
}));

export const companyHolders = createTable("company_holder", (d) => ({
	id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
	userId: d
		.varchar({ length: 255 })
		.notNull()
		.references(() => users.id),
	companyId: d
		.varchar({ length: 255 })
		.notNull()
		.references(() => companies.id),
	approved: d.boolean().default(false).notNull(),
	approvedAt: d.timestamp({ mode: "date" }),
}));

export const companyHolderRelations = relations(companyHolders, ({ one }) => ({
	user: one(users, { fields: [companyHolders.userId], references: [users.id] }),
	company: one(companies, {
		fields: [companyHolders.companyId],
		references: [companies.id],
	}),
}));
