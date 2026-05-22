"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { z } from 'zod';

export default function ForgotPassword() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const forgotSchema = z.object({
		email: z.string()
			.email("Enter a valid email address")
			.refine((value) => /\.(com|ma)$/i.test(value), "Email must end with .com or .ma"),
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage(null);

		if (!email.includes("@")) {
			const message = "Please enter a valid email address. It should contain '@'.";
			setErrorMessage(message);
			toast.error(message + " Please try again.");
			setLoading(false);
			return;
		}
		const parseResult = forgotSchema.safeParse({ email });
		if (!parseResult.success) {
			const message = parseResult.error.issues[0]?.message || "Invalid input";
			setErrorMessage(message);
			toast.error(message + " Please try again.");
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				"http://127.0.0.1:1337/auth/forgot-password",
				{ email },
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				}
			);

			const data = await response.data;
			const message = data.message || "Password reset email sent successfully";
			toast.success(message);
			router.push("/login");

		} catch (err) {
			console.error(err);
			const message = axios.isAxiosError(err) && err.response?.data?.message
				? err.response.data.message
				: err instanceof Error
						? err.message
						: "An unknown error occurred.";
			setErrorMessage(message);
			toast.error(message + " Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="font-body min-h-screen flex items-center justify-center p-6" style={{backgroundColor: "#f9f9fd", color: "#191c1e"}}>
			<main className="w-full max-w-120">
				<div className="flex flex-col items-center mb-10">
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter" style={{color: "#191c1e"}}>
						MedReserve
					</h1>
				</div>

				<div className="glass-panel rounded-xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12">
					<header className="mb-8 text-center">
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Forgot Password</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Enter your email to receive a password reset link</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="email" style={{color: "#191c1e"}}>Email Address</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="email"
								name="email"
								placeholder="your@email.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
						</div>

						{errorMessage && (
							<div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ backgroundColor: "#ffe6e6", color: "#8b0000" }} role="alert">
								{errorMessage}
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]" 
							style={{backgroundColor: "#0057cd", color: "#ffffff", boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)", opacity: loading ? 0.5 : 1, borderRadius: "24px"}}
							onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"}
							onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}
						>
							{loading ? "Sending..." : "Send Reset Link"}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-sm font-medium" style={{color: "#424655"}}>
							<span
								onClick={() => router.push('/login')}
								className="font-bold hover:underline underline-offset-4 cursor-pointer" style={{color: "#0057cd", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}
								onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
								onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
							>
								Back to Login
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
