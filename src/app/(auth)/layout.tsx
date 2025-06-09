import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { OnboardingInterface } from "../_components/onboarding";

import { TRPCReactProvider } from "@/trpc/react";

export default async function MainAppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const userData = await auth();

	if (!userData) redirect("/login");

	if (!userData.user.literacyLevel)
		return (
			<TRPCReactProvider>
				<OnboardingInterface />
				<Toaster richColors />
			</TRPCReactProvider>
		);

	return (
		<TRPCReactProvider>
			{children}
			<Toaster richColors />
		</TRPCReactProvider>
	);
}
