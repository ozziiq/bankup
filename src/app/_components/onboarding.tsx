// "use client";
// import React, { useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { toast } from "sonner";

// // Type definitions
// type Answer = {
// 	q1: number | null;
// 	q2: number | null;
// 	q3: number | null;
// 	q4: number | null;
// 	q5: number | null;
// };

// type Recommendation = {
// 	level: string;
// 	detail: string;
// };

// // Question options data
// const questions = [
// 	{
// 		id: 1,
// 		text: "1. Seberapa sering Anda mencatat pemasukan dan pengeluaran bisnis?",
// 		options: [
// 			{ value: 1, label: "Jarang, kadang lupa mencatat" },
// 			{ value: 2, label: "Hanya mencatat transaksi besar" },
// 			{ value: 3, label: "Secara rutin setiap minggu" },
// 			{ value: 4, label: "Setiap hari dengan detail lengkap" },
// 		],
// 	},
// 	{
// 		id: 2,
// 		text: "2. Bagaimana Anda mengelola pajak bisnis?",
// 		options: [
// 			{ value: 1, label: "Saya belum memikirkan pajak bisnis" },
// 			{ value: 2, label: "Menyerahkan ke orang lain/keluarga" },
// 			{ value: 3, label: "Mencatat secara manual saat waktu pajak" },
// 			{ value: 4, label: "Sistem terintegrasi dengan pembukuan rutin" },
// 		],
// 	},
// 	{
// 		id: 3,
// 		text: "3. Seberapa paham Anda dengan istilah laporan keuangan?",
// 		options: [
// 			{ value: 1, label: "Tidak paham sama sekali" },
// 			{ value: 2, label: "Hanya tahu istilahnya saja" },
// 			{ value: 3, label: "Paham dasar dan bisa membaca laporan sederhana" },
// 			{ value: 4, label: "Sangat paham dan bisa menganalisis" },
// 		],
// 	},
// 	{
// 		id: 4,
// 		text: "4. Bagaimana Anda membuat keputusan bisnis?",
// 		options: [
// 			{ value: 1, label: "Berdasarkan perasaan atau pengalaman saja" },
// 			{ value: 2, label: "Melihat uang yang ada di rekening" },
// 			{ value: 3, label: "Menganalisis catatan keuangan sederhana" },
// 			{
// 				value: 4,
// 				label: "Berdasarkan laporan dan analisis keuangan lengkap",
// 			},
// 		],
// 	},
// 	{
// 		id: 5,
// 		text: "5. Apa tujuan penggunaan sistem keuangan ini?",
// 		options: [
// 			{ value: 1, label: "Hanya untuk mencatat pemasukan/pengeluaran dasar" },
// 			{ value: 2, label: "Memantau arus kas dan saldo rekening" },
// 			{
// 				value: 3,
// 				label: "Membuat laporan keuangan untuk pengembangan bisnis",
// 			},
// 			{
// 				value: 4,
// 				label: "Analisis mendalam untuk strategi bisnis dan investasi",
// 			},
// 		],
// 	},
// ];

// const Tooltip = ({ word, tooltip }: { word: string; tooltip: string }) => (
// 	<span className="group relative inline-block cursor-help border-gray-500 border-b border-dotted">
// 		{word}
// 		<span className="-translate-x-1/2 absolute bottom-full left-1/2 z-10 hidden w-48 transform rounded-md bg-gray-800 p-2 text-white text-xs group-hover:block">
// 			{tooltip}
// 		</span>
// 	</span>
// );

// export const OnboardingInterface = () => {
// 	const [currentSlide, setCurrentSlide] = useState(1);
// 	const [answers, setAnswers] = useState<Answer>({
// 		q1: null,
// 		q2: null,
// 		q3: null,
// 		q4: null,
// 		q5: null,
// 	});
// 	const [showResult, setShowResult] = useState(false);
// 	const [recommendation, setRecommendation] = useState<Recommendation | null>(
// 		null,
// 	);

// 	const totalSlides = 5;

// 	const handleAnswerChange = (question: keyof Answer, value: number) => {
// 		setAnswers((prev) => ({ ...prev, [question]: value }));
// 	};

// 	const nextSlide = () => {
// 		if (!answers[`q${currentSlide}` as keyof Answer]) {
// 			toast.error("Silakan pilih salah satu jawaban");
// 			return;
// 		}

// 		if (currentSlide < totalSlides) {
// 			setCurrentSlide((prev) => prev + 1);
// 		}
// 	};

// 	const prevSlide = () => {
// 		if (currentSlide > 1) {
// 			setCurrentSlide((prev) => prev - 1);
// 		}
// 	};

// 	const calculateResult = () => {
// 		if (!answers.q5) {
// 			alert("Silakan pilih salah satu jawaban");
// 			return;
// 		}

// 		const totalScore = Object.values(answers).reduce(
// 			// biome-ignore lint/style/noNonNullAssertion: udah dicegat dari user atas
// 			(sum, val) => sum! + (val || 0),
// 			0,
// 		);

// 		if (!totalScore) return;

// 		let recommendation: Recommendation;
// 		if (totalScore <= 9) {
// 			recommendation = {
// 				level: "Beginner",
// 				detail: "Antarmuka sederhana dengan panduan langkah demi langkah",
// 			};
// 		} else if (totalScore <= 15) {
// 			recommendation = {
// 				level: "Intermediate",
// 				detail: "Antarmuka dengan dashboard dan laporan dasar",
// 			};
// 		} else {
// 			recommendation = {
// 				level: "Professional",
// 				detail: "Antarmuka lengkap dengan analisis dan alat profesional",
// 			};
// 		}

// 		setRecommendation(recommendation);
// 		setShowResult(true);
// 	};

// 	const continueToApp = () => {
// 		// This would be handled by the parent component in a real app
// 		alert(`Mengarahkan ke antarmuka: ${recommendation?.level}`);
// 	};

// 	const progressPercent = (currentSlide / totalSlides) * 100;

// 	return (
// 		<div className="bg-slate-200/40 py-10">
// 			<div className="mx-auto max-w-2xl rounded-xl bg-white shadow-md md:p-8">
// 				<div className="mb-6 text-center">
// 					<h1 className="font-bold text-2xl text-gray-800">
// 						Penyesuaian Antarmuka
// 					</h1>
// 					<p className="mt-2 text-gray-600">
// 						Jawab pertanyaan berikut sesuai kemampuan Anda dalam keuangan.
// 						Halaman ini bertujuan memilih otomatis user interface yang cocok
// 						untuk Anda.
// 					</p>
// 				</div>

// 				<div className="mb-6">
// 					<div className="h-2 overflow-hidden rounded-full bg-gray-200">
// 						<div
// 							className="h-full bg-gradient-to-r from-teal-600 to-teal-800 transition-all duration-500 ease-in-out"
// 							style={{ width: `${progressPercent}%` }}
// 						/>
// 					</div>
// 					<div className="mt-1 text-right text-gray-500 text-sm">
// 						{currentSlide} dari {totalSlides}
// 					</div>
// 				</div>

// 				{!showResult ? (
// 					<div className="animate-fadeIn">
// 						{questions.map((question) => (
// 							<div
// 								key={question.id}
// 								className={`${currentSlide === question.id ? "block" : "hidden"}`}
// 							>
// 								<div className="mb-4 font-semibold text-gray-800 text-lg">
// 									{question.id === 3 ? (
// 										<>
// 											3. Seberapa paham Anda dengan istilah{" "}
// 											<Tooltip
// 												word="laporan keuangan"
// 												tooltip="Seperti neraca, laba rugi, arus kas"
// 											/>
// 											?
// 										</>
// 									) : (
// 										question.text
// 									)}
// 								</div>

// 								<div className="mb-6 space-y-3">
// 									{question.options.map((option) => (
// 										<label
// 											key={option.value}
// 											className={`block cursor-pointer rounded-lg border p-4 transition-colors ${answers[`q${question.id}` as keyof Answer] ===
// 												option.value
// 												? "border-teal-600 bg-teal-50"
// 												: "border-gray-300 hover:border-teal-400"
// 												}`}
// 										>
// 											<input
// 												type="radio"
// 												name={`q${question.id}`}
// 												value={option.value}
// 												checked={
// 													answers[`q${question.id}` as keyof Answer] ===
// 													option.value
// 												}
// 												onChange={() =>
// 													handleAnswerChange(
// 														`q${question.id}` as keyof Answer,
// 														option.value,
// 													)
// 												}
// 												className="hidden"
// 											/>
// 											<div className="flex items-center">
// 												<div
// 													className={`mr-3 flex h-5 w-5 items-center justify-center rounded-full border-2 ${answers[`q${question.id}` as keyof Answer] ===
// 														option.value
// 														? "border-teal-600 bg-teal-600"
// 														: "border-gray-400"
// 														}`}
// 												>
// 													{answers[`q${question.id}` as keyof Answer] ===
// 														option.value && (
// 															<div className="h-2 w-2 rounded-full bg-white" />
// 														)}
// 												</div>
// 												<span>{option.label}</span>
// 											</div>
// 										</label>
// 									))}
// 								</div>

// 								<div className="mt-6 flex justify-between">
// 									<button
// 										type="button"
// 										className={`rounded-full border px-6 py-2 font-medium ${currentSlide === 1
// 											? "cursor-not-allowed border-gray-300 text-gray-400"
// 											: "border-teal-600 text-teal-600 transition-colors hover:bg-teal-600 hover:text-white"
// 											}`}
// 										onClick={prevSlide}
// 										disabled={currentSlide === 1}
// 									>
// 										Sebelumnya
// 									</button>

// 									{currentSlide < totalSlides ? (
// 										<button
// 											type="button"
// 											className="rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
// 											onClick={nextSlide}
// 										>
// 											Berikutnya
// 										</button>
// 									) : (
// 										<button
// 											type="button"
// 											className="rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
// 											onClick={calculateResult}
// 										>
// 											Lihat Hasil
// 										</button>
// 									)}
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				) : (
// 					<div className="animate-fadeIn py-8 text-center">
// 						<FaCheckCircle className="mx-auto mb-4 text-6xl text-teal-600" />
// 						<h2 className="mb-4 font-bold text-2xl text-teal-600">
// 							Rekomendasi Antarmuka
// 						</h2>
// 						<p className="mb-6 text-gray-600">
// 							Berdasarkan jawaban Anda, kami telah memilih antarmuka yang paling
// 							sesuai dengan tingkat pemahaman keuangan Anda.
// 						</p>

// 						<div className="mb-8">
// 							<div className="font-bold text-4xl text-teal-600">
// 								{recommendation?.level}
// 							</div>
// 							<div className="text-gray-600">{recommendation?.detail}</div>
// 						</div>

// 						<button
// 							type="button"
// 							className="w-full rounded-full bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
// 							onClick={continueToApp}
// 						>
// 							Lanjut ke Fitur Utama
// 						</button>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaLock } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

// Define TypeScript interfaces
interface Question {
	id: string;
	text: string;
	options: Option[];
}

interface Option {
	value: number;
	label: string;
}

interface Recommendation {
	literacy: "beginner" | "intermediate" | "professional";
	level: "Beginner" | "Intermediate" | "Professional";
	title: string;
	description: string;
	detail: string;
}

// Business types
const BUSINESS_TYPES = [
	{ value: "retail", label: "Retail" },
	// Add more business types here in the future
];

// Zod schema for form validation
const formSchema = z.object({
	businessName: z.string().min(1, "Nama bisnis harus diisi"),
	businessType: z.string().min(1, "Jenis bisnis harus dipilih"),
	q1: z.number().min(1).max(4),
	q2: z.number().min(1).max(4),
	q3: z.number().min(1).max(4),
	q4: z.number().min(1).max(4),
	q5: z.number().min(1).max(4),
});

type FormValues = z.infer<typeof formSchema>;

export const OnboardingInterface = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const totalSlides = 6; // 0: business info, 1-5: questions

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			businessName: "",
			businessType: "",
			q1: 0,
			q2: 0,
			q3: 0,
			q4: 0,
			q5: 0,
		},
	});

	const questions: Question[] = [
		{
			id: "q1",
			text: "1. Seberapa sering Anda mencatat pemasukan dan pengeluaran bisnis?",
			options: [
				{ value: 1, label: "Jarang, kadang lupa mencatat" },
				{ value: 2, label: "Hanya mencatat transaksi besar" },
				{ value: 3, label: "Secara rutin setiap minggu" },
				{ value: 4, label: "Setiap hari dengan detail lengkap" },
			],
		},
		{
			id: "q2",
			text: "2. Bagaimana Anda mengelola pajak bisnis?",
			options: [
				{ value: 1, label: "Saya belum memikirkan pajak bisnis" },
				{ value: 2, label: "Menyerahkan ke orang lain/keluarga" },
				{ value: 3, label: "Mencatat secara manual saat waktu pajak" },
				{ value: 4, label: "Sistem terintegrasi dengan pembukuan rutin" },
			],
		},
		{
			id: "q3",
			text: "3. Seberapa paham Anda dengan istilah laporan keuangan?",
			options: [
				{ value: 1, label: "Tidak paham sama sekali" },
				{ value: 2, label: "Hanya tahu istilahnya saja" },
				{ value: 3, label: "Paham dasar dan bisa membaca laporan sederhana" },
				{ value: 4, label: "Sangat paham dan bisa menganalisis" },
			],
		},
		{
			id: "q4",
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
			id: "q5",
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

	const recommendations: Recommendation[] = [
		{
			literacy: "beginner",
			level: "Beginner",
			title: "Rekomendasi Antarmuka",
			description:
				"Berdasarkan jawaban Anda, kami telah memilih antarmuka yang paling sesuai dengan tingkat pemahaman keuangan Anda.",
			detail: "Antarmuka sederhana dengan panduan langkah demi langkah",
		},
		{
			literacy: "intermediate",
			level: "Intermediate",
			title: "Antarmuka Menengah",
			description:
				"Kami merekomendasikan antarmuka dengan fitur yang lebih lengkap sesuai dengan pengetahuan Anda.",
			detail: "Antarmuka dengan dashboard dan laporan dasar",
		},
		{
			literacy: "professional",
			level: "Professional",
			title: "Antarmuka Profesional",
			description:
				"Berdasarkan kemampuan Anda, kami merekomendasikan antarmuka profesional dengan fitur lengkap.",
			detail: "Antarmuka lengkap dengan analisis dan alat profesional",
		},
	];

	const handleNext = async () => {
		// Validate current slide before proceeding
		let isValid = true;

		if (currentSlide === 0) {
			// Validate business info
			isValid = await form.trigger(["businessName", "businessType"]);
		} else {
			// Validate question
			const currentQuestion = `q${currentSlide}`;
			isValid = await form.trigger(currentQuestion as keyof FormValues);
		}

		if (!isValid) {
			toast.error("Silakan lengkapi data terlebih dahulu");
			return;
		}

		if (currentSlide < totalSlides - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
			// Last slide - show results
			setShowResult(true);
		}
	};

	const handlePrev = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		}
	};

	const calculateResult = () => {
		const values = form.getValues();
		const totalScore = [
			values.q1,
			values.q2,
			values.q3,
			values.q4,
			values.q5,
		].reduce((sum, value) => sum + value, 0);

		switch (true) {
			case totalScore <= 9:
				return recommendations[0];
			case totalScore <= 15:
				return recommendations[1];
			default:
				return recommendations[2];
		}
	};

	const continueToApp = () => {
		const formData = form.getValues();
		console.log("Business Info:", {
			name: formData.businessName,
			type: formData.businessType,
			currentRecommendation,
		});

		toast.success("Mengarahkan ke aplikasi utama...");
		// Navigation logic would go here
	};

	const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
	const currentRecommendation = showResult
		? calculateResult()
		: recommendations[0];

	return (
		<div className="bg-slate-200/40 py-10">
			<div className="mx-auto max-w-4xl p-4">
				<div className="rounded-xl bg-white p-6 shadow-md md:p-8">
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
						<div className="h-2 w-full rounded-full bg-gray-200">
							<div
								className="h-2 rounded-full bg-teal-600 transition-all duration-500"
								style={{ width: `${progressPercentage}%` }}
							/>
						</div>
						<div className="mt-1 text-right text-gray-500 text-sm">
							{currentSlide + 1} dari {totalSlides}
						</div>
					</div>

					{!showResult ? (
						<Form {...form}>
							<form>
								{/* Business Info Slide (Page 0) */}
								<div className={`${currentSlide === 0 ? "block" : "hidden"}`}>
									<div className="space-y-6">
										<FormField
											control={form.control}
											name="businessName"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="mb-2 block font-semibold text-gray-800 text-lg">
														Nama Bisnis Anda
													</FormLabel>
													<FormControl>
														<Input
															{...field}
															placeholder="Masukkan nama bisnis Anda"
															className="p-4 text-base"
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="businessType"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="mb-2 block font-semibold text-gray-800 text-lg">
														Jenis Bisnis
													</FormLabel>
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger className="p-4 text-base">
																<SelectValue placeholder="Pilih jenis bisnis" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{BUSINESS_TYPES.map((type) => (
																<SelectItem key={type.value} value={type.value}>
																	{type.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>

								{/* Question Slides */}
								{questions.map((question, index) => (
									<div
										key={question.id}
										className={`${index + 1 === currentSlide ? "block" : "hidden"}`}
									>
										<FormField
											control={form.control}
											name={question.id as keyof FormValues}
											render={({ field }) => (
												<FormItem>
													<FormLabel className="mb-4 block font-semibold text-gray-800 text-lg">
														{question.id === "q3" ? (
															<>
																3. Seberapa paham Anda dengan istilah{" "}
																<Tooltip>
																	<TooltipTrigger asChild>
																		<span className="cursor-help underline">
																			laporan keuangan
																		</span>
																	</TooltipTrigger>
																	<TooltipContent>
																		<p>Seperti neraca, laba rugi, arus kas</p>
																	</TooltipContent>
																</Tooltip>
																?
															</>
														) : (
															question.text
														)}
													</FormLabel>
													<FormControl>
														<RadioGroup
															onValueChange={(value) =>
																field.onChange(Number(value))
															}
															value={field.value?.toString()}
															className="space-y-3"
														>
															{question.options.map((option) => (
																<FormItem
																	key={option.value}
																	className="flex items-center space-x-3 space-y-0"
																>
																	<FormControl>
																		<RadioGroupItem
																			value={option.value.toString()}
																		/>
																	</FormControl>
																	<FormLabel
																		className={`cursor-pointer rounded-lg border p-4 font-normal transition-colors ${
																			field.value === option.value
																				? "border-teal-600 bg-teal-50"
																				: "border-gray-300 hover:border-teal-400"
																		} w-full`}
																	>
																		{option.label}
																	</FormLabel>
																</FormItem>
															))}
														</RadioGroup>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								))}
							</form>
						</Form>
					) : (
						<div className="py-8 text-center">
							<div className="mb-6 flex justify-center">
								<FaCheckCircle className="text-6xl text-teal-600" />
							</div>
							<h2 className="mb-4 font-bold text-2xl text-teal-600">
								{currentRecommendation?.title}
							</h2>
							<p className="mb-6 text-gray-600">
								{currentRecommendation?.description}
							</p>
							<div className="mb-8">
								<div className="font-bold text-4xl text-teal-600">
									{currentRecommendation?.level}
								</div>
								<div className="text-gray-600">
									{currentRecommendation?.detail}
								</div>
							</div>
							<div className="mb-6 rounded-lg bg-gray-50 p-4 text-left">
								<h3 className="mb-2 font-semibold text-gray-800">
									Informasi Bisnis Anda
								</h3>
								<p className="text-gray-600">
									<span className="font-medium">Nama Bisnis:</span>{" "}
									{form.getValues().businessName}
								</p>
								<p className="text-gray-600">
									<span className="font-medium">Jenis Bisnis:</span>{" "}
									{BUSINESS_TYPES.find(
										(t) => t.value === form.getValues().businessType,
									)?.label || ""}
								</p>
							</div>
							<Button
								className="w-full bg-teal-600 text-white hover:bg-teal-700"
								onClick={continueToApp}
							>
								Lanjut ke Fitur Utama
							</Button>
						</div>
					)}

					{!showResult && (
						<div className="mt-8 flex justify-between">
							<Button
								variant="outline"
								className="border-teal-600 text-teal-600 hover:bg-teal-50"
								disabled={currentSlide === 0}
								onClick={handlePrev}
							>
								Sebelumnya
							</Button>
							<Button
								className="bg-teal-600 text-white hover:bg-teal-700"
								onClick={handleNext}
							>
								{currentSlide === totalSlides - 1
									? "Lihat Hasil"
									: "Berikutnya"}
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
