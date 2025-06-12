import { BeginnerModeForm } from "@/app/_components/transactions/beginner";
import { auth } from "@/server/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Transaksi",
};

export default async function TransactionPage() {
	const userData = await auth();

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const literacy = userData!.user.literacyLevel;

	return (
		<div className="space-y-2">
			<h2 className="scroll-m-20 pb-2 font-semibold text-3xl tracking-tight first:mt-0">
				Input Transaksi
			</h2>

			{literacy !== "professional" ? <BeginnerModeForm /> : null}
		</div>
	);
}
