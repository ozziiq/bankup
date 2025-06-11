"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	FiArrowLeft,
	FiArrowRight,
	FiBarChart2,
	FiCheckCircle,
	FiCreditCard,
	FiDollarSign,
	FiFile,
	FiFilePlus,
	FiFileText,
	FiHelpCircle,
	FiPieChart,
	FiTrendingUp,
} from "react-icons/fi";
import { toast } from "sonner";
import { z } from "zod";

// Define form schema with Zod
const formSchema = z.object({
	pendapatan: z.number().min(0, "Pendapatan harus angka positif"),
	gaji: z.number().min(0, "Gaji harus angka positif").default(0),
	listrik: z.number().min(0, "Listrik harus angka positif").default(0),
	sewa: z.number().min(0, "Sewa harus angka positif").default(0),
	bahanBaku: z.number().min(0, "Bahan baku harus angka positif").default(0),
	kas: z.number().min(0, "Kas harus angka positif").default(0),
	piutang: z.number().min(0, "Piutang harus angka positif").default(0),
	persediaan: z.number().min(0, "Persediaan harus angka positif").default(0),
	asetTetap: z.number().min(0, "Aset tetap harus angka positif").default(0),
	utangUsaha: z.number().min(0, "Utang usaha harus angka positif").default(0),
	pinjaman: z.number().min(0, "Pinjaman harus angka positif").default(0),
	modalAwal: z.number().min(0, "Modal awal harus angka positif").default(0),
	investasiTambahan: z
		.number()
		.min(0, "Investasi tambahan harus angka positif")
		.default(0),
});

type FormValues = z.infer<typeof formSchema>;

// Custom currency input component with IDR formatting
interface CurrencyInputProps
	extends Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		"onChange" | "value"
	> {
	value: number;
	onChange: (value: number) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
	({ value, onChange, ...props }, ref) => {
		const [displayValue, setDisplayValue] = useState<string>("");

		// Reset display value when the value prop changes
		useEffect(() => {
			if (value || value === 0) {
				setDisplayValue(
					new Intl.NumberFormat("id-ID", {
						maximumFractionDigits: 0,
					}).format(value),
				);
			}
		}, [value]); // This dependency ensures it resets when the value changes

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value.replace(/[^0-9]/g, "");
			const numericValue = rawValue ? Number.parseInt(rawValue, 10) : 0;
			setDisplayValue(
				rawValue ? new Intl.NumberFormat("id-ID").format(numericValue) : "",
			);
			onChange(numericValue);
		};

		const handleBlur = () => {
			if (value || value === 0) {
				setDisplayValue(
					new Intl.NumberFormat("id-ID", {
						style: "currency",
						currency: "IDR",
						minimumFractionDigits: 0,
					}).format(value),
				);
			}
		};

		const handleFocus = () => {
			setDisplayValue(value.toString().replace(/[^0-9]/g, ""));
		};

		return (
			<Input
				ref={ref}
				{...props}
				value={displayValue}
				onChange={handleChange}
				onBlur={handleBlur}
				onFocus={handleFocus}
			/>
		);
	},
);

CurrencyInput.displayName = "CurrencyInput";

const totalSteps = 5;

export const BeginnerModeForm: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [showResults, setShowResults] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [progress, setProgress] = useState(0);

	const saveReport = api.finance.saveBeginnerReport.useMutation({
		onSuccess: () => {
			toast.success("Laporan tersimpan!");
			setShowResults(true);

			setTimeout(() => void setShowModal(true), 450);
		},
		onError: () => toast.error("Gagal menyimpan laporan"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		trigger,
		watch,
		reset,
	} = useForm<FormValues>({
		// @ts-ignore
		resolver: zodResolver(formSchema),
		defaultValues: {
			pendapatan: 0,
			gaji: 0,
			listrik: 0,
			sewa: 0,
			bahanBaku: 0,
			kas: 0,
			piutang: 0,
			persediaan: 0,
			asetTetap: 0,
			utangUsaha: 0,
			pinjaman: 0,
			modalAwal: 0,
			investasiTambahan: 0,
		},
	});

	const formValues = watch();

	// Calculate progress
	useEffect(() => {
		const progressValue = ((currentStep - 1) / (totalSteps - 1)) * 100;
		setProgress(progressValue);
	}, [currentStep]);

	// Calculate results
	const calculateResults = () => {
		const totalBeban =
			formValues.gaji +
			formValues.listrik +
			formValues.sewa +
			formValues.bahanBaku;
		const labaBersih = formValues.pendapatan - totalBeban;

		const totalAset =
			formValues.kas +
			formValues.piutang +
			formValues.persediaan +
			formValues.asetTetap;
		const totalUtang = formValues.utangUsaha + formValues.pinjaman;
		const totalModal =
			formValues.modalAwal + formValues.investasiTambahan + labaBersih;
		const neraca = totalAset - (totalUtang + totalModal);

		const arusKasOperasi = formValues.pendapatan - totalBeban;
		const arusKasInvestasi = -formValues.asetTetap;
		const arusKasPendanaan = formValues.investasiTambahan - formValues.pinjaman;

		return {
			labaBersih,
			totalAset,
			totalUtang,
			totalModal,
			neraca,
			arusKasOperasi,
			arusKasInvestasi,
			arusKasPendanaan,
			totalBeban,
		};
	};

	const results = calculateResults();

	// Format to IDR currency
	const formatIDR = (value: number) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0,
		}).format(value);
	};

	// Navigation functions
	const nextStep = async () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const onSubmit = () => void saveReport.mutate(formValues);

	const resetForm = () => {
		reset();
		setCurrentStep(1);
		setShowResults(false);
		setShowModal(false);
	};

	// Render current step based on currentStep state
	const renderCurrentStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<div className="transition-all duration-300">
						<h2 className="mb-2 font-bold text-gray-800 text-xl">
							Pendapatan Usaha
						</h2>
						<p className="mb-6 text-gray-600">
							Masukkan total uang yang masuk dari penjualan produk/jasa
						</p>

						<div className="space-y-2">
							<Label htmlFor="pendapatan">Uang Masuk</Label>
							<Controller
								name="pendapatan"
								control={control}
								render={({ field }) => (
									<CurrencyInput
										id="pendapatan"
										placeholder="Masukkan jumlah dalam Rupiah"
										value={field.value}
										onChange={field.onChange}
									/>
								)}
							/>
							{errors.pendapatan && (
								<p className="mt-1 text-red-500 text-sm">
									{errors.pendapatan.message}
								</p>
							)}
						</div>
					</div>
				);

			case 2:
				return (
					<div className="transition-all duration-300">
						<h2 className="mb-2 font-bold text-gray-800 text-xl">
							Beban Usaha
						</h2>
						<p className="mb-6 text-gray-600">
							Masukkan pengeluaran rutin untuk menjalankan usaha
						</p>

						<div className="space-y-5">
							<Label className="text-base">Beban Operasional</Label>

							<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="gaji">Gaji karyawan</Label>
									<Controller
										name="gaji"
										control={control}
										render={({ field }) => (
											<CurrencyInput
												id="gaji"
												placeholder="Masukkan gaji"
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="listrik">Listrik, air, internet</Label>
									<Controller
										name="listrik"
										control={control}
										render={({ field }) => (
											<CurrencyInput
												id="listrik"
												placeholder="Masukkan biaya"
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="sewa">Sewa tempat</Label>
									<Controller
										name="sewa"
										control={control}
										render={({ field }) => (
											<CurrencyInput
												id="sewa"
												placeholder="Masukkan sewa"
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="bahanBaku">Bahan baku</Label>
									<Controller
										name="bahanBaku"
										control={control}
										render={({ field }) => (
											<CurrencyInput
												id="bahanBaku"
												placeholder="Masukkan biaya bahan"
												value={field.value}
												onChange={field.onChange}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</div>
				);

			case 3:
				return (
					<div className="transition-all duration-300">
						<h2 className="mb-2 font-bold text-gray-800 text-xl">Aset Usaha</h2>
						<p className="mb-6 text-gray-600">
							Masukkan nilai harta yang dimiliki oleh usaha
						</p>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="kas">Kas di tangan/rekening</Label>
								<Controller
									name="kas"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											key="kas-input"
											id="kas"
											placeholder="Masukkan jumlah kas"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="piutang">Piutang usaha</Label>
								<Controller
									name="piutang"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											key="piutang-input"
											id="piutang"
											placeholder="Masukkan piutang"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="persediaan">Persediaan barang</Label>
								<Controller
									name="persediaan"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											key="persediaan-input"
											id="persediaan"
											placeholder="Masukkan persediaan"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="asetTetap">Aset tetap</Label>
								<Controller
									name="asetTetap"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											id="asetTetap"
											key="asetTetap-input"
											placeholder="Peralatan, kendaraan"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				);

			case 4:
				return (
					<div className="transition-all duration-300">
						<h2 className="mb-2 font-bold text-gray-800 text-xl">
							Utang Usaha
						</h2>
						<p className="mb-6 text-gray-600">
							Masukkan kewajiban yang harus dibayar oleh usaha
						</p>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="utangUsaha">Utang ke supplier</Label>
								<Controller
									name="utangUsaha"
									key="utangUsaha-input"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											id="utangUsaha"
											placeholder="Masukkan utang"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="pinjaman">Pinjaman bank/kredit</Label>
								<Controller
									name="pinjaman"
									key="pinjaman-input"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											id="pinjaman"
											placeholder="Masukkan pinjaman"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				);

			case 5:
				return (
					<div className="transition-all duration-300">
						<h2 className="mb-2 font-bold text-gray-800 text-xl">
							Modal Usaha
						</h2>
						<p className="mb-6 text-gray-600">
							Masukkan modal yang dimiliki oleh pemilik usaha
						</p>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="modalAwal">Modal awal usaha</Label>
								<Controller
									name="modalAwal"
									key="modalAwal-input"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											id="modalAwal"
											placeholder="Masukkan modal awal"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="investasiTambahan">Investasi tambahan</Label>
								<Controller
									name="investasiTambahan"
									control={control}
									render={({ field }) => (
										<CurrencyInput
											id="investasiTambahan"
											key="investasiTambahan-input"
											placeholder="Masukkan investasi"
											value={field.value}
											onChange={field.onChange}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	return (
		<div>
			<div className="mx-auto">
				<Card className="overflow-hidden rounded-xl shadow-lg">
					<CardHeader className="border-b">
						<CardTitle className="flex items-center gap-2 text-2xl text-teal-600">
							<FiPieChart className="h-6 w-6" />
							<span>Mode Pemula</span>
						</CardTitle>
						<CardDescription>
							Yuk mulai input datamu, nanti kami bantu hitung otomatis!
						</CardDescription>
					</CardHeader>

					<CardContent>
						{/* Progress Bar */}
						<div>
							<div className="relative mb-8 flex justify-between">
								<div className="-translate-y-1/2 absolute top-1/2 right-0 left-0 z-0 h-1.5 bg-gray-200" />
								<Progress
									value={progress}
									className="-translate-y-1/2 absolute top-1/2 left-0 z-10 h-1.5 bg-teal-700/40 transition-all duration-700"
								/>
								{[1, 2, 3, 4, 5].map((step) => (
									<div
										key={step}
										className={`relative z-20 flex h-10 w-10 items-center justify-center rounded-full border-3 transition-colors ${
											currentStep === step
												? "border-teal-500 bg-white text-teal-500"
												: currentStep > step
													? "border-teal-500 bg-teal-500 text-white"
													: "border-gray-300 bg-white text-gray-500"
										}`}
									>
										{step}
									</div>
								))}
							</div>
						</div>

						{/* Form Steps */}
						{!showResults ? (
							<div>
								{renderCurrentStep()}

								<div className="mt-8 flex justify-between">
									<Button
										variant="outline"
										className="border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
										disabled={currentStep === 1 || saveReport.isPending}
										onClick={prevStep}
									>
										<FiArrowLeft className="mr-2" /> Sebelumnya
									</Button>

									{currentStep < totalSteps ? (
										<Button onClick={nextStep}>
											Berikutnya <FiArrowRight className="ml-2" />
										</Button>
									) : (
										<Button
											disabled={saveReport.isPending}
											onClick={handleSubmit(onSubmit)}
										>
											Hitung Laporan
										</Button>
									)}
								</div>
							</div>
						) : (
							/* Results Section */
							<div className="animate-fade-in">
								<h2 className="mb-6 font-bold text-gray-800 text-xl">
									Hasil Perhitungan
								</h2>

								<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
									<CardContent className="p-4">
										<div className="mb-2 flex items-center gap-2 text-teal-600">
											<FiTrendingUp className="h-5 w-5" />
											<span className="font-semibold">Laba Bersih</span>
										</div>
										<div className="mb-2 font-bold text-2xl text-gray-800">
											{formatIDR(results.labaBersih)}
										</div>
										<p className="text-gray-600 text-sm">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger className="flex items-center gap-1 underline decoration-dotted">
														<span>Laba Bersih</span>
														<FiHelpCircle className="h-4 w-4" />
													</TooltipTrigger>
													<TooltipContent>
														<p>Pendapatan dikurangi semua beban usaha</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
											<span> = Pendapatan - Beban</span>
										</p>
									</CardContent>
								</Card>

								<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
									<CardContent className="p-4">
										<div className="mb-2 flex items-center gap-2 text-teal-600">
											<FiBarChart2 className="h-5 w-5" />
											<span className="font-semibold">Neraca</span>
										</div>
										<div className="mb-2 font-bold text-2xl text-gray-800">
											{formatIDR(results.totalAset)} ={" "}
											{formatIDR(results.totalUtang + results.totalModal)}
											{results.neraca !== 0 && (
												<span className="ml-2 text-red-500 text-sm">
													(Selisih: {formatIDR(results.neraca)})
												</span>
											)}
										</div>
										<p className="text-gray-600 text-sm">
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger className="flex items-center gap-1 underline decoration-dotted">
														<span>Neraca</span>
														<FiHelpCircle className="h-4 w-4" />
													</TooltipTrigger>
													<TooltipContent>
														<p>Aset harus sama dengan jumlah Utang dan Modal</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
											<span> = Aset = Utang + Modal</span>
										</p>
									</CardContent>
								</Card>

								<Card className="mb-6 border-teal-500 border-l-4 bg-blue-50">
									<CardContent className="p-4">
										<div className="mb-2 flex items-center gap-2 text-teal-600">
											<FiCreditCard className="h-5 w-5" />
											<span className="font-semibold">Arus Kas</span>
										</div>
										<div className="mb-2 font-bold text-gray-800 text-xl">
											<div>Operasi: {formatIDR(results.arusKasOperasi)}</div>
											<div>
												Investasi: {formatIDR(results.arusKasInvestasi)}
											</div>
											<div>
												Pendanaan: {formatIDR(results.arusKasPendanaan)}
											</div>
										</div>
										<p className="text-gray-600 text-sm">
											Ringkasan arus kas dari operasi, investasi, dan pendanaan
										</p>
									</CardContent>
								</Card>

								<div className="mb-8 text-gray-600 text-sm">
									<p>
										Laporan disusun berdasarkan{" "}
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className="inline-flex items-center gap-1 underline decoration-dotted">
													<span>SAK EMKM</span>
													<FiHelpCircle className="h-4 w-4" />
												</TooltipTrigger>
												<TooltipContent>
													<p>
														Standar Akuntansi Keuangan untuk Entitas Mikro,
														Kecil, dan Menengah
													</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
										.
									</p>
								</div>

								<div className="flex flex-col justify-center gap-4 sm:flex-row">
									<Button className="bg-teal-600 hover:bg-teal-700">
										<FiFile className="mr-2" /> Unduh PDF
									</Button>
									{/* <Button
										variant="outline"
										className="border-teal-600 text-teal-600 hover:bg-teal-50"
									>
										<FiFilePlus className="mr-2" /> Unduh Excel
									</Button> */}
									<Button variant="outline" onClick={resetForm}>
										Buat Laporan Baru
									</Button>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Success Modal */}
			<Dialog open={showModal} onOpenChange={setShowModal}>
				<DialogContent className="rounded-lg sm:max-w-md">
					<DialogHeader>
						<div className="flex justify-center">
							<div className="mb-4 rounded-full bg-teal-100 p-4">
								<FiCheckCircle className="h-12 w-12 text-teal-600" />
							</div>
						</div>
						<DialogTitle className="text-center text-2xl">Selamat!</DialogTitle>
						<DialogDescription className="text-center text-gray-600">
							Laporan Anda siap digunakan untuk evaluasi usaha.
						</DialogDescription>
					</DialogHeader>
					<div className="text-center">
						<p className="mb-6 text-gray-600">
							Anda dapat mengunduh laporan dalam format PDF atau Excel.
						</p>
						<Button
							onClick={() => setShowModal(false)}
							className="bg-teal-600 hover:bg-teal-700"
						>
							Mengerti
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};
