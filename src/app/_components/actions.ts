"use server";

import { signIn, signOut } from "@/server/auth";

export async function googleLogin() {
	await signIn("google");
}

export async function logout() {
	await signOut();
}
