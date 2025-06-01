"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { FaChartLine, FaBars } from "react-icons/fa";

export const Navbar = () => {
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
					{/* <FaChartLine className="mr-2" /> */}
					BankUp
				</Link>
				<button
					className="text-2xl text-gray-700 lg:hidden"
					onClick={() => setMenuOpen((o) => !o)}
					type="button"
					aria-label="Open menu"
				>
					{/* <FaBars /> */}=
				</button>
				<ul
					ref={navLinksRef}
					className={`fixed top-[80px] left-0 flex w-full flex-col bg-white shadow-lg transition-all duration-300 lg:static lg:w-auto lg:flex-row lg:shadow-none ${
						menuOpen ? "left-0" : "left-[-100%]"
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
					<li>
						<a
							href="#features"
							className="font-semibold transition hover:text-teal-600"
						>
							Features
						</a>
					</li>
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
						EcoKnow.ME
					</h3>
					<p className="mb-4">
						Simplifying financial management for Indonesian small businesses
						since 2020.
					</p>
					<div className="flex gap-3">
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-yellow-400 hover:text-slate-700"
						>
							FB
						</a>
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-yellow-400 hover:text-slate-700"
						>
							X
						</a>
						<a
							href="https://www.instagram.com/ecoknow.me/"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-yellow-400 hover:text-slate-700"
						>
							IG
						</a>
						<a
							href="/somewhere-meaningful"
							className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-yellow-400 hover:text-slate-700"
						>
							LN
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
				&copy; 2025 EcoKnow.ME. All rights reserved. |{" "}
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
