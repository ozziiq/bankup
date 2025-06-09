import "@/styles/globals.css";

import { env } from "@/env";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

// import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
	title: {
		default: `${env.NEXT_PUBLIC_BRAND_NAME} - Simplify Your Business Finance`,
		template: `%s | ${env.NEXT_PUBLIC_BRAND_NAME}`,
	},
	description: "Insert proper description here",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
});

// export default function RootLayout({
// 	children,
// }: Readonly<{ children: React.ReactNode }>) {
// 	return (
// 		<html lang="en" className={`${geist.variable}`}>
// 			<body>
// 				<TRPCReactProvider>{children}</TRPCReactProvider>
// 			</body>
// 		</html>
// 	);
// }

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="id-ID" className={`${geist.variable}`}>
			<body>{children}</body>
		</html>
	);
}
