// layout.tsx
import {
	MainNavNonProfessional,
	MobileMenu,
	NavProfile,
} from "@/app/_components/beginner-intermediate";
import { OnboardingInterface } from "@/app/_components/onboarding";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";
import { auth } from "@/server/auth";
import { TRPCReactProvider } from "@/trpc/react";
import { ChartLine, Menu } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
				<div className="border-b bg-white transition">
					<div className="flex min-h-16 items-center justify-between px-4">
						<div className="flex items-center">
							<div className="mr-3 md:hidden">
								<MobileMenu
									// biome-ignore lint/style/noNonNullAssertion: <explanation>
									name={userData.user.name!}
									// biome-ignore lint/style/noNonNullAssertion: <explanation>
									email={userData.user.email!}
									// biome-ignore lint/style/noNonNullAssertion: <explanation>
									profileImage={userData.user.image!}
								/>
							</div>

							<Link
								href="/app"
								className="flex items-center font-bold text-2xl text-teal-600"
							>
								<ChartLine className="mr-2" />
								{env.NEXT_PUBLIC_BRAND_NAME}
							</Link>
						</div>

						<div className="hidden px-4 md:flex">
							<MainNavNonProfessional />
						</div>

						<div className="hidden px-4 md:block">
							<NavProfile
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								name={userData.user.name!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								profileImage={userData.user.image!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								email={userData.user.email!}
							/>
						</div>

						<div className="md:hidden">
							<NavProfile
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								name={userData.user.name!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								profileImage={userData.user.image!}
								// biome-ignore lint/style/noNonNullAssertion: <explanation>
								email={userData.user.email!}
								isMobile={true}
							/>
						</div>
					</div>
				</div>
			) : null}

			{userData.user.literacyLevel !== "professional" ? (
				<div className="min-h-[87vh] bg-gray-200/40 px-4 py-6 md:px-32">
					{children}
				</div>
			) : (
				children
			)}
			<Toaster richColors />
		</TRPCReactProvider>
	);
}
