import { Footer, Navbar } from "@/app/_components/landing-page";

export default function LandingPageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
}
