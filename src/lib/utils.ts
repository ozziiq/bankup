import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatIDR = (value: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);
};

export const calculateResults = (values: {
	gaji: number;
	listrik: number;
	sewa: number;
	bahanBaku: number;
	pendapatan: number;
	kas: number;
	piutang: number;
	persediaan: number;
	asetTetap: number;
	utangUsaha: number;
	pinjaman: number;
	modalAwal: number;
	investasiTambahan: number;
}) => {
	const totalBeban =
		values.gaji + values.listrik + values.sewa + values.bahanBaku;
	const labaBersih = values.pendapatan - totalBeban;

	const totalAset =
		values.kas + values.piutang + values.persediaan + values.asetTetap;
	const totalUtang = values.utangUsaha + values.pinjaman;
	const totalModal = values.modalAwal + values.investasiTambahan + labaBersih;
	const neraca = totalAset - (totalUtang + totalModal);

	const arusKasOperasi = values.pendapatan - totalBeban;
	const arusKasInvestasi = -values.asetTetap;
	const arusKasPendanaan = values.investasiTambahan - values.pinjaman;

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
