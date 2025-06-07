"use client";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

// Type definitions
type Answer = {
	q1: number | null;
	q2: number | null;
	q3: number | null;
	q4: number | null;
	q5: number | null;
};

type Recommendation = {
	level: string;
	detail: string;
};

// Question options data
const questions = [
	{
		id: 1,
		text: "1. Seberapa sering Anda mencatat pemasukan dan pengeluaran bisnis?",
		options: [
			{ value: 1, label: "Jarang, kadang lupa mencatat" },
			{ value: 2, label: "Hanya mencatat transaksi besar" },
			{ value: 3, label: "Secara rutin setiap minggu" },
			{ value: 4, label: "Setiap hari dengan detail lengkap" },
		],
	},
	{
		id: 2,
		text: "2. Bagaimana Anda mengelola pajak bisnis?",
		options: [
			{ value: 1, label: "Saya belum memikirkan pajak bisnis" },
			{ value: 2, label: "Menyerahkan ke orang lain/keluarga" },
			{ value: 3, label: "Mencatat secara manual saat waktu pajak" },
			{ value: 4, label: "Sistem terintegrasi dengan pembukuan rutin" },
		],
	},
	{
		id: 3,
		text: "3. Seberapa paham Anda dengan istilah laporan keuangan?",
		options: [
			{ value: 1, label: "Tidak paham sama sekali" },
			{ value: 2, label: "Hanya tahu istilahnya saja" },
			{ value: 3, label: "Paham dasar dan bisa membaca laporan sederhana" },
			{ value: 4, label: "Sangat paham dan bisa menganalisis" },
		],
	},
	{
		id: 4,
		text: "4. Bagaimana Anda membuat keputusan bisnis?",
		options: [
			{ value: 1, label: "Berdasarkan perasaan atau pengalaman saja" },
			{ value: 2, label: "Melihat uang yang ada di rekening" },
			{ value: 3, label: "Menganalisis catatan keuangan sederhana" },
			{
				value: 4,
				label: "Berdasarkan laporan dan analisis keuangan lengkap",
			},
		],
	},
	{
		id: 5,
		text: "5. Apa tujuan penggunaan sistem keuangan ini?",
		options: [
			{ value: 1, label: "Hanya untuk mencatat pemasukan/pengeluaran dasar" },
			{ value: 2, label: "Memantau arus kas dan saldo rekening" },
			{
				value: 3,
				label: "Membuat laporan keuangan untuk pengembangan bisnis",
			},
			{
				value: 4,
				label: "Analisis mendalam untuk strategi bisnis dan investasi",
			},
		],
	},
];

const Tooltip = ({ word, tooltip }: { word: string; tooltip: string }) => (
	<span className="group relative inline-block cursor-help border-gray-500 border-b border-dotted">
		{word}
		<span className="-translate-x-1/2 absolute bottom-full left-1/2 z-10 hidden w-48 transform rounded-md bg-gray-800 p-2 text-white text-xs group-hover:block">
			{tooltip}
		</span>
	</span>
);

export const OnboardingInterface = () => {
	const [currentSlide, setCurrentSlide] = useState(1);
	const [answers, setAnswers] = useState<Answer>({
		q1: null,
		q2: null,
		q3: null,
		q4: null,
		q5: null,
	});
	const [showResult, setShowResult] = useState(false);
	const [recommendation, setRecommendation] = useState<Recommendation | null>(
		null,
	);

	const totalSlides = 5;

	const handleAnswerChange = (question: keyof Answer, value: number) => {
		setAnswers((prev) => ({ ...prev, [question]: value }));
	};

	const nextSlide = () => {
		if (!answers[`q${currentSlide}` as keyof Answer]) {
			alert("Silakan pilih salah satu jawaban");
			return;
		}

		if (currentSlide < totalSlides) {
			setCurrentSlide((prev) => prev + 1);
		}
	};

	const prevSlide = () => {
		if (currentSlide > 1) {
			setCurrentSlide((prev) => prev - 1);
		}
	};

	const calculateResult = () => {
		if (!answers.q5) {
			alert("Silakan pilih salah satu jawaban");
			return;
		}

		const totalScore = Object.values(answers).reduce(
			// biome-ignore lint/style/noNonNullAssertion: udah dicegat dari user atas
			(sum, val) => sum! + (val || 0),
			0,
		);

		console.log(totalScore);

		if (!totalScore) return;

		let recommendation: Recommendation;
		if (totalScore <= 9) {
			recommendation = {
				level: "Beginner",
				detail: "Antarmuka sederhana dengan panduan langkah demi langkah",
			};
		} else if (totalScore <= 15) {
			recommendation = {
				level: "Intermediate",
				detail: "Antarmuka dengan dashboard dan laporan dasar",
			};
		} else {
			recommendation = {
				level: "Professional",
				detail: "Antarmuka lengkap dengan analisis dan alat profesional",
			};
		}

		setRecommendation(recommendation);
		setShowResult(true);
	};

	const continueToApp = () => {
		// This would be handled by the parent component in a real app
		alert(`Mengarahkan ke antarmuka: ${recommendation?.level}`);
	};

	const progressPercent = (currentSlide / totalSlides) * 100;

	return (
		<div className="bg-slate-200/40 py-10">
			<div className="mx-auto max-w-2xl rounded-xl bg-white shadow-md md:p-8">
				<div className="mb-6 text-center">
					<h1 className="font-bold text-2xl text-gray-800">
						Penyesuaian Antarmuka
					</h1>
					<p className="mt-2 text-gray-600">
						Jawab pertanyaan berikut sesuai kemampuan Anda dalam keuangan.
						Halaman ini bertujuan memilih otomatis user interface yang cocok
						untuk Anda.
					</p>
				</div>

				<div className="mb-6">
					<div className="h-2 overflow-hidden rounded-full bg-gray-200">
						<div
							className="h-full bg-gradient-to-r from-teal-600 to-teal-800 transition-all duration-500 ease-in-out"
							style={{ width: `${progressPercent}%` }}
						/>
					</div>
					<div className="mt-1 text-right text-gray-500 text-sm">
						{currentSlide} dari {totalSlides}
					</div>
				</div>

				{!showResult ? (
					<div className="animate-fadeIn">
						{questions.map((question) => (
							<div
								key={question.id}
								className={`${currentSlide === question.id ? "block" : "hidden"}`}
							>
								<div className="mb-4 font-semibold text-gray-800 text-lg">
									{question.id === 3 ? (
										<>
											3. Seberapa paham Anda dengan istilah{" "}
											<Tooltip
												word="laporan keuangan"
												tooltip="Seperti neraca, laba rugi, arus kas"
											/>
											?
										</>
									) : (
										question.text
									)}
								</div>

								<div className="mb-6 space-y-3">
									{question.options.map((option) => (
										<label
											key={option.value}
											className={`block cursor-pointer rounded-lg border p-4 transition-colors ${
												answers[`q${question.id}` as keyof Answer] ===
												option.value
													? "border-teal-600 bg-teal-50"
													: "border-gray-300 hover:border-teal-400"
											}`}
										>
											<input
												type="radio"
												name={`q${question.id}`}
												value={option.value}
												checked={
													answers[`q${question.id}` as keyof Answer] ===
													option.value
												}
												onChange={() =>
													handleAnswerChange(
														`q${question.id}` as keyof Answer,
														option.value,
													)
												}
												className="hidden"
											/>
											<div className="flex items-center">
												<div
													className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
														answers[`q${question.id}` as keyof Answer] ===
														option.value
															? "border-teal-600 bg-teal-600"
															: "border-gray-400"
													}`}
												>
													{answers[`q${question.id}` as keyof Answer] ===
														option.value && (
														<div className="h-2 w-2 rounded-full bg-white" />
													)}
												</div>
												<span>{option.label}</span>
											</div>
										</label>
									))}
								</div>

								<div className="mt-6 flex justify-between">
									<button
										type="button"
										className={`rounded-full border px-6 py-2 font-medium ${
											currentSlide === 1
												? "cursor-not-allowed border-gray-300 text-gray-400"
												: "border-teal-600 text-teal-600 transition-colors hover:bg-teal-600 hover:text-white"
										}`}
										onClick={prevSlide}
										disabled={currentSlide === 1}
									>
										Sebelumnya
									</button>

									{currentSlide < totalSlides ? (
										<button
											type="button"
											className="rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
											onClick={nextSlide}
										>
											Berikutnya
										</button>
									) : (
										<button
											type="button"
											className="rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
											onClick={calculateResult}
										>
											Lihat Hasil
										</button>
									)}
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="animate-fadeIn py-8 text-center">
						<FaCheckCircle className="mx-auto mb-4 text-6xl text-teal-600" />
						<h2 className="mb-4 font-bold text-2xl text-teal-600">
							Rekomendasi Antarmuka
						</h2>
						<p className="mb-6 text-gray-600">
							Berdasarkan jawaban Anda, kami telah memilih antarmuka yang paling
							sesuai dengan tingkat pemahaman keuangan Anda.
						</p>

						<div className="mb-8">
							<div className="font-bold text-4xl text-teal-600">
								{recommendation?.level}
							</div>
							<div className="text-gray-600">{recommendation?.detail}</div>
						</div>

						<button
							type="button"
							className="w-full rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
							onClick={continueToApp}
						>
							Lanjut ke Fitur Utama
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
