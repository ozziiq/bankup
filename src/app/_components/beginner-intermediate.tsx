"use client";

import { logout } from "@/app/_components/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DoorOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavProfile({
	name,
	email,
	profileImage,
}: {
	name: string;
	email: string;
	profileImage: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-8 w-8">
						<AvatarImage src={profileImage.replace("=s96-c", "")} asChild>
							<Image
								src={profileImage.replace("=s96-c", "")}
								alt="Foto Profil"
								width={80}
								height={80}
							/>
						</AvatarImage>
						<AvatarFallback className="uppercase">
							{name.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="font-medium text-sm leading-none">{name}</p>
						<p className="text-muted-foreground text-xs leading-none">
							{email}
						</p>
					</div>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href={"/profile"} className="w-full hover:cursor-pointer">
							Profil Anda
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href={"/about"} className="w-full hover:cursor-pointer">
							Tentang Aplikasi
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />
				<form action={logout}>
					<DropdownMenuItem asChild>
						<button
							type="submit"
							className="w-full text-zinc-900 hover:cursor-pointer"
						>
							<DoorOpen className="mr-1" />
							Keluar
						</button>
					</DropdownMenuItem>
				</form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

const linksNonProfessional = [
	{
		label: "Dashboard",
		href: "/app",
		fn: (path: string) => path === "/app",
	},
	{
		label: "Transaksi",
		href: "/app/transaction",
		fn: (path: string) => path.startsWith("/app/transaction"),
	},
	{
		label: "Laporan",
		href: "/app/report",
		fn: (path: string) => path.startsWith("/app/report"),
	},
];

export function MainNavNonProfessional() {
	const location = usePathname();

	return (
		<ul className="flex flex-row gap-5">
			{linksNonProfessional.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className="w-full hover:cursor-pointer"
				>
					<Badge
						variant={link.fn(location) ? "default" : "outline"}
						className={`text-base ${link.fn(location) ? "bg-teal-600 text-white/95 underline" : ""}`}
					>
						{link.label}
					</Badge>
				</Link>
			))}
		</ul>
	);
}
