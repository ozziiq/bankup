import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function MainAppLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const userData = await auth();

	if (!userData) redirect("/login");

	// if (true) return (
	//     <>Ini onboarding</>
	// )

	return children;
}
