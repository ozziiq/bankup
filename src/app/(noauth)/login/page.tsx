import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/server/auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default async function LoginPage() {
	const session = await auth();

	if (!session) {
		return (
			<main className="flex h-screen flex-col items-center justify-center gap-24 bg-gray-100">
				<form
					action={async () => {
						"use server";
						await signIn("google");
					}}
				>
					<Button
						type="submit"
						className="flex flex-row items-center gap-5 rounded-full px-10 py-7 font-semibold text-lg no-underline transition"
					>
						<FcGoogle className="text-3xl" />
						Log In menggunakan Google
					</Button>
				</form>
			</main>
		);
	}

	redirect("/app");
}
