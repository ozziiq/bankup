// beginner-intermediate.tsx
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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { env } from "@/env";
import { DoorOpen, Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export function NavProfile({
	name,
	email,
	profileImage,
	isMobile = false,
}: {
	name: string;
	email: string;
	profileImage: string;
	isMobile?: boolean;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className={`relative rounded-full ${isMobile ? "h-8 w-8" : "h-10 w-10"}`}
				>
					<Avatar className={`${isMobile ? "h-8 w-8" : "h-10 w-10"}`}>
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
						className={`text-base ${
							link.fn(location) ? "bg-teal-600 text-white/95 underline" : ""
						}`}
					>
						{link.label}
					</Badge>
				</Link>
			))}
		</ul>
	);
}

// New Mobile Menu component
export function MobileMenu({
	name,
	email,
	profileImage,
}: {
	name: string;
	email: string;
	profileImage: string;
}) {
	const [open, setOpen] = useState(false);
	const location = usePathname();
	const router = useRouter();

	const handleLinkClick = (href: string) => {
		router.push(href);
		setOpen(false);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<MenuIcon className="h-5 w-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[300px]">
				<SheetHeader>
					<SheetTitle className="text-left">
						{env.NEXT_PUBLIC_BRAND_NAME}
					</SheetTitle>
				</SheetHeader>

				<div className="space-y-4 px-2.5">
					<div className="flex items-center gap-3">
						<Avatar className="h-10 w-10">
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
						<div>
							<p className="font-medium">{name}</p>
							<p className="text-muted-foreground text-sm">{email}</p>
						</div>
					</div>

					<div className="border-t pt-4">
						{linksNonProfessional.map((link) => (
							<div
								key={link.href}
								className={`mb-3 rounded-md px-3 py-2 ${
									link.fn(location)
										? "bg-teal-600 text-white"
										: "hover:bg-gray-100"
								}`}
							>
								<button
									type="button"
									onClick={() => handleLinkClick(link.href)}
									className="w-full text-left"
								>
									{link.label}
								</button>
							</div>
						))}

						<div className="mt-8 space-y-2">
							<div className="rounded-md px-3 py-2 hover:bg-gray-100">
								<Link href="/profile" className="block w-full">
									Profil Anda
								</Link>
							</div>
							<div className="rounded-md px-3 py-2 hover:bg-gray-100">
								<Link href="/about" className="block w-full">
									Tentang Aplikasi
								</Link>
							</div>
							<form action={logout}>
								<button
									type="submit"
									className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-100"
								>
									<DoorOpen className="mr-2 inline h-4 w-4" />
									Keluar
								</button>
							</form>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
