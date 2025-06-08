"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PlanType = "otp" | "subscription";

const PRICING_CARDS = [
	{
		type: "otp" as const,
		icon: "💎",
		title: "One-Time Purchase",
		desc: "Bayar sekali, akses selamanya. Cocok untuk usaha mikro & kecil.",
		price: "Rp0",
		priceNote: "sekali bayar",
		tooltip: "Rekomendasi untuk pemula",
		features: [
			"Akses UI Beginner & Intermediate",
			"Max 12 laporan/bulan",
			"Export PDF/Excel (format SAK EMKM saja)",
			"Tidak ada update otomatis",
			"Tidak termasuk multi-user & support prioritas",
		],
		upsell: "Tambah fitur export advanced / multi-user (add-on berbayar)",
		buttonClass: "bg-green-600 hover:bg-green-700",
		borderClass: "border-t-4 border-green-500",
	},
	{
		type: "subscription" as const,
		icon: "📈",
		title: "Subscription",
		desc: "Akses penuh, selalu update, cocok untuk usaha berkembang.",
		price: "Rp0",
		priceNote: "/bulan atau Rp0/tahun",
		tooltip: "Cocok untuk profesional",
		features: [
			"Akses Beginner, Intermediate, Advanced UI",
			"Laporan tak terbatas",
			"Multi-user (owner, admin, staf)",
			"Analitik keuangan, reminder, laporan pajak",
			"Export PDF/Excel/custom template",
			"Prioritas support, onboarding online",
			"Update fitur otomatis",
		],
		buttonClass: "bg-blue-600 hover:bg-blue-700",
		borderClass: "border-t-4 border-blue-500",
	},
];

const COMPARISON_ROWS = [
	{
		feature: "Harga",
		otp: "Rp69.000 sekali bayar",
		subscription: "Rp55.000/bulan atau Rp499.000/tahun",
	},
	{
		feature: "UI Akses",
		otp: "Beginner, Intermediate",
		subscription: "Beginner, Intermediate, Advanced",
	},
	{
		feature: "Jumlah laporan",
		otp: "Max 12/bulan",
		subscription: "Tak terbatas",
	},
	{
		feature: "Ekspor laporan",
		otp: "SAK EMKM (standar)",
		subscription: "PDF, Excel, custom template",
	},
	{
		feature: "Multi-user",
		otp: "Tidak termasuk (add-on)",
		subscription: "Termasuk",
	},
	{
		feature: "Update",
		otp: "Tidak termasuk",
		subscription: "Termasuk otomatis",
	},
	{
		feature: "Prioritas support",
		otp: "Tidak ada",
		subscription: "Ada",
	},
];

const MODAL_ICONS: Record<PlanType, string> = {
	otp: "💎",
	subscription: "📈",
};

const MODAL_BUTTON_STYLE: Record<PlanType, string> = {
	otp: "bg-green-600 hover:bg-green-700",
	subscription: "bg-blue-600 hover:bg-blue-700",
};

export default function Pricing() {
	const modalRef = useRef<HTMLDivElement>(null);
	const [modalOpen, setModalOpen] = useState(false);
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const [selectedPlan, setSelectedPlan] = useState<PlanType>(null!);

	// Close modal on outside click
	useEffect(() => {
		if (!modalOpen) return;
		const handle = (e: MouseEvent) => {
			if (modalRef.current && e.target === modalRef.current)
				setModalOpen(false);
		};
		window.addEventListener("mousedown", handle);
		return () => window.removeEventListener("mousedown", handle);
	}, [modalOpen]);

	// Modal open logic
	const openModal = (plan: PlanType) => {
		setSelectedPlan(plan);
		setModalOpen(true);
	};

	return (
		<>
			{/* Hero */}
			<section className="pt-28 pb-5 text-center">
				<div className="container mx-auto px-4">
					<h1 className="mb-4 font-bold text-3xl text-gray-800 md:text-4xl">
						Pilih Paket Sesuai Kebutuhan Bisnis Anda
					</h1>
					<p className="mx-auto max-w-xl text-gray-600 text-lg">
						Dukung pencatatan usaha Anda dengan paket fleksibel
					</p>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="container mx-auto px-4">
				<div className="my-12 flex flex-wrap justify-center gap-8">
					{PRICING_CARDS.map((card) => (
						<div
							key={card.type}
							className={`hover:-translate-y-2 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:shadow-2xl ${card.borderClass}`}
						>
							<div className="relative p-7 text-center">
								<div className="mb-4 text-4xl">{card.icon}</div>
								<h3 className="mb-2 font-bold text-xl">{card.title}</h3>
								<p className="mb-3 text-gray-500">{card.desc}</p>
								<div className="mb-1 font-bold text-2xl">{card.price}</div>
								<div className="mb-2 text-gray-400 text-sm">
									{card.priceNote}
								</div>
								<div className="absolute top-4 right-4 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700 text-xs">
									{card.tooltip}
								</div>
							</div>
							<div className="px-7 pb-7">
								<ul className="mb-5 text-left">
									{card.features.map((f) => (
										<li
											key={f}
											className="relative py-2 pl-7 text-gray-700 before:absolute before:left-0 before:font-bold before:text-green-500 before:content-['✓']"
										>
											{f}
										</li>
									))}
								</ul>
								{card.upsell && (
									<div className="mb-4 rounded bg-gray-50 p-3 text-gray-500 text-sm">
										{card.upsell}
									</div>
								)}
								<button
									className={`w-full rounded py-3 font-semibold text-white transition ${card.buttonClass}`}
									onClick={() => openModal(card.type)}
									type="button"
								>
									Coba Sekarang
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Comparison Table */}
			<section className="container mx-auto my-16 px-4">
				<h2 className="mb-8 text-center font-bold text-2xl">
					Perbandingan Paket
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full min-w-[600px] overflow-hidden rounded-lg bg-white shadow-lg">
						<thead>
							<tr>
								<th className="bg-gray-50 px-6 py-3 text-left font-bold">
									Fitur
								</th>
								<th className="bg-gray-50 px-6 py-3 text-left font-bold">
									One-Time Purchase
								</th>
								<th className="bg-gray-50 px-6 py-3 text-left font-bold">
									Subscription
								</th>
							</tr>
						</thead>
						<tbody>
							{COMPARISON_ROWS.map((row) => (
								<tr key={row.otp} className="hover:bg-gray-50">
									<td className="border-b border-b-gray-100 px-6 py-3">
										{row.feature}
									</td>
									<td className="border-b border-b-gray-100 px-6 py-3">
										{row.otp}
									</td>
									<td className="border-b border-b-gray-100 px-6 py-3">
										{row.subscription}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Modal */}
			{/* Modal with fade-in/fade-out */}
			{modalOpen && (
				<div
					ref={modalRef}
					className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
						modalOpen ? "opacity-100" : "pointer-events-none opacity-0"
					}`}
				>
					<div
						className={`relative w-full max-w-md transform rounded-lg bg-white p-8 text-center shadow-lg transition-all duration-300 ${
							modalOpen
								? "translate-y-0 scale-100 opacity-100"
								: "pointer-events-none translate-y-4 scale-95 opacity-0"
						}`}
						style={{
							animation: modalOpen ? "modalFadeIn 0.25s" : "modalFadeOut 0.25s",
						}}
					>
						<button
							aria-label="Tutup"
							className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
							onClick={() => setModalOpen(false)}
							type="button"
						>
							&times;
						</button>
						<div className="mb-4 text-4xl">{MODAL_ICONS[selectedPlan]}</div>
						<h2 className="mb-3 font-bold text-xl">
							{selectedPlan === "otp"
								? "Anda memilih paket One-Time Purchase"
								: selectedPlan === "subscription"
									? "Anda memilih paket Subscription"
									: ""}
						</h2>
						<p className="mb-7">
							Yuk lanjut daftar dan mulai kelola keuangan usaha Anda dengan
							lebih baik!
						</p>
						<Link
							href={`/login?plan=${selectedPlan}`}
							className={`w-full rounded p-3 font-semibold text-white transition ${MODAL_BUTTON_STYLE[selectedPlan]}`}
						>
							Lanjut Daftar
						</Link>
					</div>
					{/* Custom modal fade keyframes for extra smoothness */}
					<style>
						{`
            @keyframes modalFadeIn {
              from { opacity: 0; transform: translateY(20px) scale(0.95);}
              to { opacity: 1; transform: translateY(0) scale(1);}
            }
            @keyframes modalFadeOut {
              from { opacity: 1; transform: translateY(0) scale(1);}
              to { opacity: 0; transform: translateY(20px) scale(0.95);}
            }
            `}
					</style>
				</div>
			)}
		</>
	);
}
