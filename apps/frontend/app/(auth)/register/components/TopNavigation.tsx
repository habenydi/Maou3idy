"use client";

import { useRouter } from "next/navigation";

export default function TopNavigation() {
	const router = useRouter();

	return (
		<header
			className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-sm"
			style={{
				backgroundColor: "rgba(248, 248, 253, 0.8)",
			}}
		>
			<div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto w-full">
				<div
					className="text-xl font-bold tracking-tighter font-headline"
					style={{ color: "#191c1e" }}
				>
					Maou<span className="text-blue-500">3</span>idy
				</div>

				<div className="flex items-center gap-4">
					<a
						href="/login"
						className="font-headline tracking-tight font-semibold"
						style={{ color: "#0057cd" }}
					>
						Sign In
					</a>

					<button
						className="px-6 py-2 rounded-xl font-headline font-bold text-sm"
						style={{
							backgroundColor: "#0d6efd",
							color: "#ffffff",
						}}
						onClick={() =>
							router.push("/doctor-register")
						}
					>
						Join as Doctor
					</button>
				</div>
			</div>
		</header>
	);
}