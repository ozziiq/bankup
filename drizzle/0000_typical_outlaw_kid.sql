CREATE TYPE "public"."literacyLevel" AS ENUM('beginner', 'intermediate', 'professional');--> statement-breakpoint
CREATE TYPE "public"."companyType" AS ENUM('retail');--> statement-breakpoint
CREATE TABLE "akurasi_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "akurasi_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "akurasi_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "akurasi_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"literacyLevel" "literacyLevel"
);
--> statement-breakpoint
CREATE TABLE "akurasi_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "akurasi_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "akurasi_company" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"type" "companyType" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "akurasi_company_holder" (
	"id" integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY (sequence name "akurasi_company_holder_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar(255) NOT NULL,
	"companyId" varchar(255) NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"approvedAt" timestamp
);
--> statement-breakpoint
ALTER TABLE "akurasi_account" ADD CONSTRAINT "akurasi_account_userId_akurasi_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."akurasi_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "akurasi_session" ADD CONSTRAINT "akurasi_session_userId_akurasi_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."akurasi_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "akurasi_company_holder" ADD CONSTRAINT "akurasi_company_holder_userId_akurasi_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."akurasi_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "akurasi_company_holder" ADD CONSTRAINT "akurasi_company_holder_companyId_akurasi_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."akurasi_company"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "akurasi_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "akurasi_session" USING btree ("userId");