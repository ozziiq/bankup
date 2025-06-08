import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { OnboardingInterface } from "../_components/onboarding";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: "aKURasi - Simplify Your Business Finance",
	description: "Insert proper description here",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function MainAppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const userData = await auth();

	if (!userData) redirect("/login");

	if (!userData.user.literacyLevel)
		return (
			<>
				<OnboardingInterface />
				<Toaster richColors />
			</>
		);

	return (
		<TRPCReactProvider>
			{children}
			<Toaster richColors />
		</TRPCReactProvider>
	);
}
