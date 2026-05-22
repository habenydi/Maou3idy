"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Img from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';
import { z } from 'zod';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const router = useRouter();

	const loginSchema = z.object({
		email: z.string()
			.email("Enter a valid email address")
			.refine((value) => /\.(com|ma)$/i.test(value), "Email must end with .com or .ma"),
		password: z.string().min(8, "Password must be at least 8 characters"),
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email.includes("@")) {
			toast.error("Please enter a valid email address. It should contain '@'.");
			return;
		}
		const parseResult = loginSchema.safeParse({ email, password });
		if (!parseResult.success) {
			const message = parseResult.error.issues[0]?.message || "Invalid input";
			toast.error(message + " Please try again.");
			return;
		}

		try {
			const { data } = await axios.post(
				"http://127.0.0.1:1337/auth/login",
				{ email, password },
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				}
			);
			toast.success("Login successful! Redirecting...");
			localStorage.setItem("token", data.token);
			localStorage.setItem("name", data.user.name);
			localStorage.setItem("auth_user", JSON.stringify(data.user));
			localStorage.setItem("remember_me", rememberMe ? "true" : "false");
			localStorage.setItem("user_role", data.user.role);
			router.push( data.user.role === "DOCTOR" ? "/doctor/dashboard" : "/success" );

		} catch (err) {
			console.error(err);
			const message =
				axios.isAxiosError(err)
					? (err.response?.data as { message?: string })?.message || "Login failed"
					: err instanceof Error
						? err.message
						: "An unknown error occurred.";
			toast.error(message + " Please try again.");
		}
	};

	return (
	<div className="font-body min-h-screen flex items-center justify-center p-6 overflow-x-hidden" style={{backgroundColor: "#f9f9fd", color: "#191c1e"}}>
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{backgroundColor: "rgba(0, 87, 205, 0.05)"}}></div>
				<div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{backgroundColor: "rgba(66, 92, 155, 0.05)"}}></div>
				<div className="absolute top-[20%] right-[15%] w-25 h-25 rounded-full blur-[60px] opacity-20" style={{backgroundColor: "#ffdbce"}}></div>
			</div>

			{/* Login Container */}
			<main className="w-full max-w-120">
				{/* Brand Identity */}
				<div className="flex flex-col items-center mb-10">
					<div className="mb-4 flex items-center justify-center w-12 h-12 rounded-4xl shadow-sm" style={{backgroundColor: "#0d6efd"}}>
						<span className="material-symbols-outlined text-2xl" data-icon="medical_services" style={{color: "#ffffff"}}>medical_services</span>
					</div>
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter" style={{color: "#191c1e"}}>
						MedReserve
					</h1>
				</div>

				{/* Login Card */}
				<div className="glass-panel rounded-2xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12">
					<header className="mb-8 text-center">
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Welcome Back</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Please enter your credentials to access your clinical dashboard.</p>
					</header>

					<form className="space-y-6" onSubmit={handleLogin}>
						{/* Email Field */}
						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="email" style={{color: "#191c1e"}}>Email Address</label>
							<div className="relative">
								<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{color: "#727787"}}>
									<span className="material-symbols-outlined text-[20px]" data-icon="mail">mail</span>
								</span>
								<input 
									className="w-full pl-12 pr-4 py-4 border-none rounded-xl placeholder:text-outline/60 transition-all duration-200 outline-none font-medium" 
									style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
									onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
									onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
									id="email" 
									name="email" 
									placeholder="dr.wilson@medreserve.com" 
									value={email} 
									onChange={(e) => setEmail(e.target.value)} 
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="password" style={{color: "#191c1e"}}>Password</label>
								<a 
									onClick={() => router.push('/forgot-password')} 
									className="text-xs font-bold transition-colors duration-200 cursor-pointer"
									style={{color: "#0057cd"}}
									onMouseEnter={(e) => e.currentTarget.style.color = "#0d6efd"}
									onMouseLeave={(e) => e.currentTarget.style.color = "#0057cd"}
								>
									Forgot password?
								</a>
							</div>
							<div className="relative">
								<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{color: "#727787"}}>
									<span className="material-symbols-outlined text-[20px]" data-icon="lock">lock</span>
								</span>
								<input 
									className="w-full pl-12 pr-12 py-4 border-none rounded-xl placeholder:text-outline/60 transition-all duration-200 outline-none font-medium" 
									style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
									onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
									onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
									id="password" 
									name="password" 
									placeholder="••••••••" 
									type={showPassword ? "text" : "password"} 
									value={password} 
									onChange={(e) => setPassword(e.target.value)} 
								/>
								<button 
									className="absolute inset-y-0 right-4 flex items-center transition-colors" 
									style={{color: "#727787"}}
									type="button" 
									onClick={() => setShowPassword(!showPassword)}
									onMouseEnter={(e) => e.currentTarget.style.color = "#424655"}
									onMouseLeave={(e) => e.currentTarget.style.color = "#727787"}
								>
									<span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
								</button>
							</div>
						</div>

						{/* Options */}
						<div className="flex items-center">
							<input 
								className="w-4 h-4 rounded" 
								style={{accentColor: "#0057cd", borderColor: "#c2c6d8", backgroundColor: "#f3f3f7"}}
								id="remember" 
								name="remember" 
								type="checkbox" 
								checked={rememberMe} 
								onChange={(e) => setRememberMe(e.target.checked)} 
							/>
							<label className="ml-2 text-sm font-medium cursor-pointer select-none" htmlFor="remember" style={{color: "#424655"}}>Remember me for 30 days</label>
						</div>

						{/* Action Button */}
						<button 
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]" 
							style={{background: "linear-gradient(to right, #0057cd, #0d6efd)", color: "#ffffff", boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)", borderRadius: "24px"}}
							onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"}
							onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}
							type="submit"
						>
							Sign In
							<span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
						</button>
					</form>

					{/* Secondary Action */}
					<div className="mt-8 text-center">
						<button 
							type="button" 
							className="text-sm font-medium" 
							style={{color: "#424655"}}
						>
							Don&apos;t have an account? 
							<span 
								className="font-bold hover:underline underline-offset-4 ml-1 cursor-pointer"
								style={{color: "#0057cd", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}
								onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
								onClick={() => 
									router.push("/register")
								}
								onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
							>
								Sign Up
							</span>
						</button>
					</div>
				</div>

				{/* Footer */}
				<footer className="mt-12">
					<div className="flex flex-wrap justify-center gap-6 mb-6">
						<a className="text-xs font-medium transition-colors" href="#" style={{color: "#424655"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0057cd"} onMouseLeave={(e) => e.currentTarget.style.color = "#424655"}>Privacy Policy</a>
						<a className="text-xs font-medium transition-colors" href="#" style={{color: "#424655"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0057cd"} onMouseLeave={(e) => e.currentTarget.style.color = "#424655"}>Terms of Service</a>
						<a className="text-xs font-medium transition-colors" href="#" style={{color: "#424655"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0057cd"} onMouseLeave={(e) => e.currentTarget.style.color = "#424655"}>Contact Support</a>
					</div>
					<p className="text-center text-[10px] font-medium tracking-wide uppercase" style={{color: "#727787"}}>
						© 2024 MedReserve Clinical Systems. All rights reserved.
					</p>
				</footer>
			</main>

			{/* Contextual Aesthetic Element (Asymmetric Detail) */}
			<div className="hidden lg:block fixed top-1/2 -right-24 -translate-y-1/2 w-64 h-96 opacity-10">
				<Img 
					alt="Clinical environment"
					fill
					data-alt="Modern high-tech medical clinic interior with clean white surfaces and soft blue ambient lighting in a professional setting" 
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkHqkkpwr0eOnMgQc0OIf1L61TFcolCMTHxPm6BOqSKDRiZcSBj5i0SSx5YDrAaRtArjRlEEHUaSO-JlNGidngNLDvErm3f5oeqkg1OzfboKqwUC-o41oEq7TrP5w_f5_Lt9qOBSQgwipkNsgr4WGewltB2UuyVvXBEInZ_1wKX4tfdXTHXcysVLmGXmgFc_3PXZR-w0MjOE1pmCAFP5ZNg4Scl11cIBqnBVqLdjq-xpAgysxmGbsDU-fYCERKJBXnoXv8DACFh5w" 
				/>
			</div>
		</div>
	);
}
