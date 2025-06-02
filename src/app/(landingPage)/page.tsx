const testimonials = [
	{
		quote:
			"“FinUMKM helped me understand my cash flow for the first time. My profits increased by 30% after just 3 months of using their analytics.”",
		img: "https://randomuser.me/api/portraits/women/45.jpg",
		name: "Aqilah Nahdah Muthiah",
		role: "Owner, Sarah's Catering",
	},
	{
		quote:
			"“The KUR integration feature saved me hours of paperwork. I got my business loan approved in half the usual time!”",
		img: "https://randomuser.me/api/portraits/men/32.jpg",
		name: "Budi Santoso",
		role: "Owner, Budi's Furniture",
	},
	{
		quote: `“As someone who's not good with numbers, the beginner package was a lifesaver. Now I'm upgrading to Intermediate as my business grows!”`,
		img: "https://randomuser.me/api/portraits/women/68.jpg",
		name: "Dewi Anggraeni",
		role: "Owner, Dewi Fashion",
	},
];

export default function Home() {
	return (
		<>
			<section className="relative bg-gradient-to-br from-teal-200/10 via-slate-100/0 to-slate-200/10 pt-44 pb-24 text-center">
				<div className="container mx-auto max-w-2xl px-4">
					<h1 className="fade-in mb-6 font-bold text-4xl text-slate-800 md:text-5xl">
						Simplify Your Business Finance
					</h1>
					<p className="fade-in mb-8 text-gray-500 text-lg delay-1">
						All-in-one financial management platform designed specifically for{" "}
						<span className="group relative cursor-help border-gray-400 border-b border-dotted">
							UMKM
							<span className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 rounded bg-gray-900 p-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
								Usaha Mikro Kecil dan Menengah (Micro, Small and Medium
								Enterprises)
							</span>
						</span>
						. Track, analyze, and grow your business effortlessly.
					</p>
					<div className="fade-in delay-2">
						<a
							href="https://umkm.enpitsu.my.id/"
							className="inline-block rounded-full bg-teal-600 px-8 py-3 font-semibold text-white transition hover:bg-teal-700"
						>
							Try Free Demo
						</a>
					</div>
					<div className="fade-in mx-auto mt-10 h-3 w-full max-w-md overflow-hidden rounded bg-gray-100 delay-3">
						<div
							className="h-full rounded bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-700"
							style={{ width: "65%" }}
						/>
					</div>
					<p className="fade-in mt-2 text-gray-500 text-sm delay-3">
						65% of onboarding completed
					</p>
				</div>
			</section>

			<section id="features" className="section features bg-white py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="section-title mb-2 text-center font-bold text-3xl text-slate-700">
						Choose Your Financial Journey
					</h2>
					<p className="section-subtitle mb-12 text-center text-gray-500">
						Select the package that matches your business needs and grow at your
						own pace
					</p>
					<div className="features-grid grid gap-8 md:grid-cols-3">
						{/* Beginner */}
						<div className="fade-in feature-card bright rounded-lg border-yellow-400 border-t-4 bg-white p-8 text-center shadow">
							{/* <FaPiggyBank className="text-yellow-400 mx-auto text-4xl mb-4" /> */}
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								Beginner
							</h3>
							<p className="mb-4 text-gray-500">
								Perfect for startups and small businesses. Simple cash flow
								tracking with intuitive interface.
							</p>
							<a
								href="learn-more/beginner-learnmore.html"
								className="btn btn-outline inline-block rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
							>
								Learn More
							</a>
						</div>
						{/* Intermediate */}
						<div className="fade-in feature-card rounded-lg border-teal-500 border-t-4 bg-white p-8 text-center shadow delay-1">
							{/* <FaChartPie className="text-teal-500 mx-auto text-4xl mb-4" /> */}
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								Intermediate
							</h3>
							<p className="mb-4 text-gray-500">
								Advanced dashboard with visual reports to help you understand
								your business performance.
							</p>
							<a
								href="learn-more/intermediate-learnmore.html"
								className="btn btn-outline inline-block rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
							>
								Learn More
							</a>
						</div>
						{/* Advanced */}
						<div className="fade-in feature-card advanced rounded-lg border-slate-700 border-t-4 bg-white p-8 text-center shadow delay-2">
							{/* <FaChartLine className="text-slate-700 mx-auto text-4xl mb-4" /> */}
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								Advanced
							</h3>
							<p className="mb-4 text-gray-500">
								Professional tools with deep analytics for growing businesses
								ready to scale.
							</p>
							<a
								href="app/professional-ui.html"
								className="btn btn-outline inline-block rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
							>
								Learn More
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="trust-badges bg-gray-100 py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="section-title mb-2 text-center font-bold text-3xl text-slate-700">
						Trusted by Thousands of UMKM
					</h2>
					<p className="section-subtitle mb-12 text-center text-gray-500">
						Our platform meets the highest standards for Indonesian small
						businesses
					</p>
					<div className="badges-container mt-8 flex flex-wrap justify-center gap-12">
						<div className="fade-in badge flex flex-col items-center">
							{/* <FaShieldAlt className="text-3xl text-teal-500 mb-3" /> */}
							<p className="font-semibold text-slate-700">SAK EMKM Ready</p>
						</div>
						<div className="fade-in badge flex flex-col items-center delay-1">
							{/* <FaHandHoldingUsd className="text-3xl text-teal-500 mb-3" /> */}
							<p className="font-semibold text-slate-700">KUR Ready</p>
						</div>
						<div className="fade-in badge flex flex-col items-center delay-2">
							{/* <FaLock className="text-3xl text-teal-500 mb-3" /> */}
							<p className="font-semibold text-slate-700">Data Encrypted</p>
						</div>
					</div>
				</div>
			</section>

			<section className="testimonials section bg-white py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="section-title mb-2 text-center font-bold text-3xl text-slate-700">
						What Our Users Say
					</h2>
					<p className="section-subtitle mb-12 text-center text-gray-500">
						Hear from business owners who transformed their financial management
					</p>
					<div className="testimonials-grid grid gap-8 md:grid-cols-3">
						{testimonials.map((t, i) => (
							<div
								key={t.img}
								className={`rounded-lg bg-gray-100 p-8 shadow fade-in${i === 1 ? " delay-1" : i === 2 ? " delay-2" : ""} testimonial-card`}
							>
								<p className="quote mb-6 text-slate-700 italic">{t.quote}</p>
								<div className="author flex items-center">
									<img
										src={t.img}
										alt={t.name}
										className="mr-4 h-12 w-12 rounded-full object-cover"
									/>
									<div className="author-info">
										<h4 className="mb-1 font-semibold text-slate-700">
											{t.name}
										</h4>
										<p className="text-gray-500 text-sm">{t.role}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section id="pricing" className="pricing section bg-gray-100 py-20">
				<div className="container mx-auto max-w-6xl px-4">
					<h2 className="section-title mb-2 text-center font-bold text-3xl text-slate-700">
						Simple, Transparent Pricing
					</h2>
					<p className="section-subtitle mb-12 text-center text-gray-500">
						Choose the plan that works for your business size and needs
					</p>
					<div className="pricing-grid grid gap-8 md:grid-cols-3">
						{/* One-Time */}
						<div className="pricing-card fade-in rounded-lg bg-white p-8 shadow">
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								One-Time Purchase
							</h3>
							<div className="price mb-4 font-bold text-3xl text-teal-600">
								Rp 69.000{" "}
								<span className="font-normal text-base text-gray-500">
									one time
								</span>
							</div>
							<ul className="pricing-features mb-6">
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Lifetime access to Beginner features
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}1 year of
									updates
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Email support
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Basic reports
								</li>
							</ul>
							<a
								href="feature-pricing/feature-pricing.html"
								className="btn btn-outline inline-block rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
							>
								Get Started
							</a>
						</div>
						{/* Annual Subscription */}
						<div className="pricing-card best-value fade-in relative rounded-lg border-2 border-yellow-400 bg-white p-8 shadow delay-1">
							<div className="-top-4 best-value-tag absolute right-6 rounded-full bg-yellow-400 px-4 py-1 font-semibold text-slate-700 text-xs">
								Best Value
							</div>
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								Annual Subscription
							</h3>
							<div className="price mb-4 font-bold text-3xl text-teal-600">
								Rp 55.000{" "}
								<span className="font-normal text-base text-gray-500">
									/ month
								</span>
							</div>
							<ul className="pricing-features mb-6">
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Access to all Intermediate features
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Continuous updates
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Priority support
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Advanced analytics
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									KUR application assistance
								</li>
							</ul>
							<a
								href="feature-pricing/feature-pricing.html"
								className="btn btn-primary inline-block rounded-full bg-teal-600 px-5 py-2 font-semibold text-white transition hover:bg-teal-700"
							>
								Get Started
							</a>
						</div>
						{/* Enterprise */}
						<div className="pricing-card fade-in rounded-lg bg-white p-8 shadow delay-2">
							<h3 className="mb-2 font-semibold text-slate-700 text-xl">
								Enterprise
							</h3>
							<div className="price mb-4 font-bold text-3xl text-teal-600">
								Custom
							</div>
							<ul className="pricing-features mb-6">
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									All Advanced features
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Dedicated account manager
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									24/7 support
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Custom integrations
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									Team access
								</li>
								<li className="mb-2 flex items-center">
									{/* <FaCheck className="text-teal-500 mr-2" /> */}
									SAK EMKM compliance
								</li>
							</ul>
							<a
								href="https://wa.me/6285157449391"
								className="btn btn-outline inline-block rounded-full border-2 border-teal-600 px-5 py-2 font-semibold text-teal-600 transition hover:bg-teal-600 hover:text-white"
							>
								Contact Sales
							</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

// import Link from "next/link";

// import { LatestPost } from "@/app/_components/post";
// import { auth } from "@/server/auth";
// import { HydrateClient, api } from "@/trpc/server";

// export default async function Home() {
// 	const hello = await api.post.hello({ text: "from tRPC" });
// 	const session = await auth();

// 	if (session?.user) {
// 		void api.post.getLatest.prefetch();
// 	}

// 	return (
// 		<HydrateClient>
// 			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
// 				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
// 					<h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
// 						Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
// 					</h1>
// 					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
// 						<Link
// 							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
// 							href="https://create.t3.gg/en/usage/first-steps"
// 							target="_blank"
// 						>
// 							<h3 className="font-bold text-2xl">First Steps →</h3>
// 							<div className="text-lg">
// 								Just the basics - Everything you need to know to set up your
// 								database and authentication.
// 							</div>
// 						</Link>
// 						<Link
// 							className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
// 							href="https://create.t3.gg/en/introduction"
// 							target="_blank"
// 						>
// 							<h3 className="font-bold text-2xl">Documentation →</h3>
// 							<div className="text-lg">
// 								Learn more about Create T3 App, the libraries it uses, and how
// 								to deploy it.
// 							</div>
// 						</Link>
// 					</div>
// 					<div className="flex flex-col items-center gap-2">
// 						<p className="text-2xl text-white">
// 							{hello ? hello.greeting : "Loading tRPC query..."}
// 						</p>

// 						<div className="flex flex-col items-center justify-center gap-4">
// 							<p className="text-center text-2xl text-white">
// 								{session && <span>Logged in as {session.user?.name}</span>}
// 							</p>
// 							<Link
// 								href={session ? "/api/auth/signout" : "/api/auth/signin"}
// 								className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
// 							>
// 								{session ? "Sign out" : "Sign in"}
// 							</Link>
// 						</div>
// 					</div>

// 					{session?.user && <LatestPost />}
// 				</div>
// 			</main>
// 		</HydrateClient>
// 	);
// }
