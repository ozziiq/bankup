import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import { createTable } from "./_table";

import { finances } from "./accountant";
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

export const companyRelations = relations(companies, ({ one, many }) => ({
	holder: many(companyHolders),
	finance: one(finances, {
		fields: [companies.id],
		references: [finances.companyId],
	}),
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
