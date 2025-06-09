"use client";

import { env } from "@/env";
import { ChartLine, Rows3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
	const pathname = usePathname();

	const [menuOpen, setMenuOpen] = useState(false);

	// biome-ignore lint/style/noNonNullAssertion: paksa aja, it'll be there anyway
	const navLinksRef = useRef<HTMLUListElement>(null!);

	useEffect(() => {
		const handler = (e: Event) => {
			if (e.target instanceof HTMLAnchorElement) {
				setMenuOpen(false);
			}
		};

		navLinksRef.current.addEventListener("click", handler);

		return () => {
			if (navLinksRef.current)
				navLinksRef.current.removeEventListener("click", handler);
		};
	}, []);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white shadow">
			<div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
				<Link
					href="/"
					className="flex items-center font-bold text-2xl text-teal-600"
					onClick={() => setMenuOpen(false)}
				>
					<ChartLine className="mr-2" />
					{env.NEXT_PUBLIC_BRAND_NAME}
				</Link>
				<button
					className="text-2xl text-gray-700 lg:hidden"
					onClick={() => setMenuOpen((o) => !o)}
					type="button"
					aria-label="Open menu"
				>
					<Rows3 />
				</button>
				<ul
					ref={navLinksRef}
					className={`-translate-y-3 lg:-translate-0 fixed top-[80px] left-0 flex w-full flex-col bg-white shadow-lg transition-all duration-300 lg:static lg:w-auto lg:flex-row lg:shadow-none ${
						menuOpen ? " left-0" : "left-[-100%]"
					} z-40 items-start gap-6 p-6 lg:z-auto lg:items-center lg:gap-8 lg:p-0`}
					style={{ height: "auto" }}
				>
					<li>
						<a
							href="https://drive.google.com/drive/folders/1HGY_fqyvd2ZDWda45zAqFGUq8ZoyiXT0"
							className="font-semibold transition hover:text-teal-600"
						>
							Laporan Keuangan Kami
						</a>
					</li>
					{pathname === "/" ? (
						<li>
							<a
								href="#features"
								className="font-semibold transition hover:text-teal-600"
							>
								Features
							</a>
						</li>
					) : null}
					<li>
						<Link
							href="/pricing"
							className="font-semibold transition hover:text-teal-600"
						>
							Pricing
						</Link>
					</li>
					<li>
						<Link
							href="/login"
							className="btn btn-outline rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
						>
							Login
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export const Footer = () => (
	<footer className="bg-[#264653] pt-16 pb-6 text-white">
		<div className="container mx-auto max-w-6xl px-4">
			<div className="mb-10 grid gap-8 md:grid-cols-4">
				<div>
					<h3 className="mb-4 font-semibold text-lg text-yellow-400">
						{env.NEXT_PUBLIC_BRAND_NAME}
					</h3>
					<p className="mb-4">
						Simplifying financial management for Indonesian small businesses
						since 2020.
					</p>
					<div className="flex gap-3">
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-50"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Facebook</title>
								<path
									d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
									fill="#0866FF"
								/>
							</svg>
						</a>
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>X</title>
								<path
									d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
									fill="#000000"
								/>
							</svg>
						</a>
						<a
							href="https://www.instagram.com/ecoknow.me/"
							className="flex h-10 w-10 items-center justify-center rounded-full transition"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Instagram</title>
								<path
									d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"
									fill="#FF0069"
								/>
							</svg>
						</a>
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-50"
						>
							<svg viewBox="0 0 382 382" fill="#000000">
								<title>LinkedIn</title>
								<g id="SVGRepo_bgCarrier" strokeWidth="0" />
								<g
									id="SVGRepo_tracerCarrier"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<g id="SVGRepo_iconCarrier">
									<path
										fill="#0077B7"
										d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z"
									/>
								</g>
							</svg>
						</a>
					</div>
				</div>
				<div>
					<h3 className="mb-4 font-semibold text-lg text-yellow-400">
						Product
					</h3>
					<ul className="space-y-2">
						<li>
							<a href="#features" className="transition hover:text-yellow-400">
								Features
							</a>
						</li>
						<li>
							<a href="#pricing" className="transition hover:text-yellow-400">
								Pricing
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Demo
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Updates
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="mb-4 font-semibold text-lg text-yellow-400">
						Resources
					</h3>
					<ul className="space-y-2">
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Blog
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Guides
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Help Center
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Webinars
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className="mb-4 font-semibold text-lg text-yellow-400">
						Company
					</h3>
					<ul className="space-y-2">
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								About Us
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Careers
							</a>
						</li>
						<li>
							<a
								href="https://wa.me/6285157449391"
								className="transition hover:text-yellow-400"
							>
								Contact
							</a>
						</li>
						<li>
							<a
								href="/somewhere-meaningful"
								className="transition hover:text-yellow-400"
							>
								Partners
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-white/10 border-t pt-6 text-center text-sm text-white/70">
				&copy; {new Date().getFullYear()} {env.NEXT_PUBLIC_BRAND_NAME}. All
				rights reserved. |{" "}
				<a href="/somewhere-meaningful" className="hover:underline">
					Privacy Policy
				</a>{" "}
				|{" "}
				<a href="/somewhere-meaningful" className="hover:underline">
					Terms of Service
				</a>
			</div>
		</div>
	</footer>
);
