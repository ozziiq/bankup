import {
	MainNavNonProfessional,
	NavProfile,
} from "@/app/_components/beginner-intermediate";
import { OnboardingInterface } from "@/app/_components/onboarding";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { auth } from "@/server/auth";
import { ChartLine } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
			{userData.user.literacyLevel !== "professional" ? (
				<div className="border-b bg-zinc-300/10 transition">
					<div className="flex min-h-16 items-center justify-between px-4">
						<Link
							href="/app"
							className="flex items-center font-bold text-2xl text-teal-600"
						>
							<ChartLine className="mr-2" />
							{env.NEXT_PUBLIC_BRAND_NAME}
						</Link>

						<div className="px-4">
							<MainNavNonProfessional />
						</div>

						<div className="px-4">
							<NavProfile
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								name={userData.user.name!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								profileImage={userData.user.image!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								email={userData.user.email!}
							/>
						</div>
					</div>
				</div>
			) : null}
			{children}
			<Toaster richColors />
		</TRPCReactProvider>
	);
}
