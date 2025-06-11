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
import { api } from "@/trpc/react";
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
	const completeBoardingMutation =
		api.company.completeCreateNewCompanyBoarding.useMutation({
			onSuccess() {
				toast.dismiss();

				toast.success(
					"Berhasil mendaftarkan dirimu! Mengarahkan ke aplikasi utama...",
				);

				setTimeout(() => location.reload(), 1200);
			},
			onError() {
				toast.dismiss();

				toast.error("Gagal mendaftarkan identitas.");
			},
		});

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

		toast.loading("Mengirimkan datamu ke server...");

		completeBoardingMutation.mutate({
			name: formData.businessName,
			type: formData.businessType as "retail",

			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			literacy: currentRecommendation!.literacy,
		});
	};

	const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
	const currentRecommendation = showResult
		? calculateResult()
		: recommendations[0];

	return (
		<div className="py-10">
			<div className="mx-auto max-w-4xl p-4">
				<div className="rounded-xl bg-white p-6 shadow-md md:p-8">
					<div className="mb-6 text-center">
						<h1 className="font-bold text-2xl text-gray-800">
							{currentSlide < 1 ? "Selamat Datang!" : "Penyesuaian Antarmuka"}
						</h1>
						<p className="mt-2 text-gray-600">
							{currentSlide < 1 ? (
								"Sebelum memulai, mari isi pertanyaan dasar supaya kami dapat menyesuaikan pengalaman anda dengan bisnis anda saat ini."
							) : (
								<>
									Jawab pertanyaan berikut sesuai kemampuan Anda dalam keuangan.
									Halaman ini bertujuan memilih otomatis user interface yang
									cocok untuk Anda.
								</>
							)}
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
								disabled={
									completeBoardingMutation.isPending ||
									completeBoardingMutation.isSuccess
								}
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
