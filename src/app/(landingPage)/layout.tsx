import { Footer, Navbar } from "@/app/_components/landing-page";

export default function LandingPageLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="bg-white font-sans text-gray-800">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
