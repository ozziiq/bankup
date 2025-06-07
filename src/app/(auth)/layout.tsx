import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { OnboardingInterface } from "../_components/onboarding";

export default async function MainAppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const userData = await auth();

	if (!userData) redirect("/login");

	// if (true) return (
	//     <>Ini onboarding</>
	// )

	return <OnboardingInterface />;

	return children;
}
