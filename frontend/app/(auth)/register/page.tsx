"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Img  from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';
import { z } from 'zod';

export default function Register() {
	const  [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm_password: "",
		terms: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const registerSchema = z.object({
		name: z.string().min(2, "Name must be at least 2 characters"),
		email: z.string()
			.trim()
			.email("Enter a valid email address")
			.refine((value) => value.includes("@"), "Please enter a valid email address. It should contain '@'.")
			.refine((value) => /\.(com|ma)$/i.test(value), "Email must end with .com or .ma"),
		phone: z.string().optional().or(z.literal("")).refine(
			(value) => typeof value === "string" && (value === "" || /^[+0-9\s()-]{7,20}$/.test(value)),
			{ message: "Enter a valid phone number" }
		),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirm_password: z.string().min(8, "Confirm password is required"),
		terms: z.boolean(),
	}).refine((data) => data.terms, {
		path: ["terms"],
		message: "Please accept the Terms of Service and Privacy Policy",
	}).refine((data) => data.password === data.confirm_password, {
		path: ["confirm_password"],
		message: "Passwords do not match",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	const handleGoogleLogin = async () => {
		try {
			// Redirect to Google OAuth endpoint - Google will handle authentication
			window.location.href = "http://localhost:1337/auth/google";
		} catch (error) {
			console.error("Error occurred while fetching Google login URL:", error);
			toast.error("an error " + error);
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			console.log("Submitting registration form with data:", formData);
			const parseResult = registerSchema.safeParse(formData);
			if (!parseResult.success) {
				const message = parseResult.error.issues[0]?.message || "Invalid input";
				toast.error(message + " Please try again.");
				setIsLoading(false);
				return;
			}

			const { data } = await axios.post(
				"http://localhost:1337/auth/register",
				{
					name: formData.name,
					email: formData.email,
					phone: formData.phone,
					password: formData.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					withCredentials: true,
				}
			);
			localStorage.setItem("auth_user", JSON.stringify(data.user));
			toast.success("Registration successful! Redirecting...");
			router.push("/success");
		} catch (err) {
			console.error(err);
			const message =
				axios.isAxiosError(err)
					? (err.response?.data as { message?: string })?.message || "Registration failed"
					: err instanceof Error
						? err.message
						: "An unknown error occurred.";
			toast.error(message + " Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col" style={{backgroundColor: "#f9f9fd"}}>
			{/* Top Navigation */}
			<header className="fixed top-0 w-full z-50 backdrop-blur-xl shadow-sm" style={{backgroundColor: "rgba(248, 248, 253, 0.8)"}}>
				<div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto w-full">
					<div className="text-xl font-bold tracking-tighter font-headline" style={{color: "#191c1e"}}>MedReserve</div>
					<nav className="hidden md:flex gap-8">
						<a className="font-headline tracking-tight font-semibold transition-colors" href="#" style={{color: "#5f6368"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0d6efd"} onMouseLeave={(e) => e.currentTarget.style.color = "#5f6368"}>Find Doctors</a>
						<a className="font-headline tracking-tight font-semibold transition-colors" href="#" style={{color: "#5f6368"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0d6efd"} onMouseLeave={(e) => e.currentTarget.style.color = "#5f6368"}>Specialties</a>
						<a className="font-headline tracking-tight font-semibold transition-colors" href="#" style={{color: "#5f6368"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0d6efd"} onMouseLeave={(e) => e.currentTarget.style.color = "#5f6368"}>About Us</a>
					</nav>
					<div className="flex items-center gap-4">
						<a className="font-headline tracking-tight font-semibold transition-colors" href="/login" style={{color: "#0057cd"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0d6efd"} onMouseLeave={(e) => e.currentTarget.style.color = "#0057cd"}>Sign In</a>
						<button className="px-6 py-2 rounded-xl font-headline font-bold text-sm active:scale-95 duration-200" style={{backgroundColor: "#0d6efd", color: "#ffffff"}} onClick={() => router.push("/register-doctor")}>Join as Doctor</button>
					</div>
				</div>
				<div className="h-px" style={{backgroundColor: "rgba(194, 198, 216, 0.5)"}}></div>
			</header>

			{/* Main Content Area */}
			<main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
				{/* Abstract Background Shapes */}
				<div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
					<div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px]" style={{backgroundColor: "rgba(160, 186, 255, 0.5)"}}></div>
					<div className="absolute top-1/2 -right-48 w-125 h-125 rounded-full blur-[120px]" style={{backgroundColor: "rgba(218, 226, 255, 0.5)"}}></div>
				</div>

				{/* Registration Card Container */}
				<div className="w-full max-w-xl relative z-10">
					{/* Form Card */}
					<div className="rounded-xl p-8 md:p-12 shadow-sm relative overflow-hidden" style={{backgroundColor: "#ffffff"}}>
						{/* Card Header */}
						<div className="mb-10">
							<h1 className="text-3xl md:text-4xl font-headline font-extrabold tracking-tighter mb-3" style={{color: "#191c1e"}}>Create an Account</h1>
							<p className="text-sm md:text-base leading-relaxed" style={{color: "#5f6368"}}>Join MedReserve to manage your healthcare appointments with clinical precision.</p>
						</div>

						{/* Social Login Section */}
						<div className="flex flex-col gap-4 mb-8">
							<button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-200 active:scale-95" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#edeef1"} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f3f3f7"}>
								<Img alt="Google Logo" width={20} height={20} src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7sekk05ih7WxToSvBqVjBRIZ_sW2fr6DiucmVZvGhZmof4OkP2XJGGUTQIW7tAodaGdD7l4r0riWG05JO2Nnd8AiczWbQsbNEiywjHdF59_aXtElHddBdqHRVE6VtV-TvFhjgCk9ecyKmCUZZre7DxDHk-ktv44cUTS0X-pbfpNHQ2lRicHyQ-dkZUmZKaJrTpv9OZmQEy2m0kJqq1pm63_bOtCR73jugDvilnd2W0Ylj3xPuDFJ-IYJxHcpsz2vnO-33ui5xpTQ" />
								Continue with Google
							</button>
							<div className="flex items-center gap-4 py-2">
								<div className="h-px flex-1" style={{backgroundColor: "#e7e8eb"}}></div>
								<span className="text-xs font-semibold tracking-widest uppercase" style={{color: "#727787"}}>OR</span>
								<div className="h-px flex-1" style={{backgroundColor: "#e7e8eb"}}></div>
							</div>
						</div>

						{/* Registration Form */}
						<form className="space-y-6" onSubmit={handleSubmit}>
							{/* Full Name */}
							<div className="space-y-2">
								<label className="block text-xs font-bold tracking-wider uppercase pl-1" htmlFor="name" style={{color: "#5f6368"}}>Full Name</label>
								<div className="relative">
									<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]" data-icon="person" style={{color: "#727787"}}>person</span>
									<input className="w-full pl-12 pr-4 py-3.5 border-none rounded-xl focus:ring-2 transition-all duration-200 placeholder:text-outline/60 text-sm outline-none" style={{backgroundColor: "#f3f3f7", color: "#191c1e", boxShadow: "none"}} id="name" name="name" placeholder="John Doe" type="text" value={formData.name} onChange={handleChange} onFocus={(e) => {e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)";}} onBlur={(e) => {e.currentTarget.style.backgroundColor = "#f3f3f7"; e.currentTarget.style.boxShadow = "none";}} />
								</div>
							</div>

							{/* Email & Phone Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="block text-xs font-bold tracking-wider uppercase pl-1" htmlFor="email" style={{color: "#5f6368"}}>Email</label>
									<div className="relative">
										<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]" data-icon="mail" style={{color: "#727787"}}>mail</span>
										<input className="w-full pl-12 pr-4 py-3.5 border-none rounded-xl focus:ring-2 transition-all duration-200 placeholder:text-outline/60 text-sm outline-none" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}} id="email" name="email" placeholder="john@example.com"value={formData.email} onChange={handleChange} onFocus={(e) => {e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)";}} onBlur={(e) => {e.currentTarget.style.backgroundColor = "#f3f3f7"; e.currentTarget.style.boxShadow = "none";}} />
									</div>
								</div>
								<div className="space-y-2">
									<label className="block text-xs font-bold tracking-wider uppercase pl-1" htmlFor="phone" style={{color: "#5f6368"}}>Phone</label>
									<div className="relative">
										<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]" data-icon="call" style={{color: "#727787"}}>call</span>
										<input className="w-full pl-12 pr-4 py-3.5 border-none rounded-xl focus:ring-2 transition-all duration-200 placeholder:text-outline/60 text-sm outline-none" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}} id="phone" name="phone" placeholder="+1 (555) 000-0000" type="tel" value={formData.phone} onChange={handleChange} onFocus={(e) => {e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)";}} onBlur={(e) => {e.currentTarget.style.backgroundColor = "#f3f3f7"; e.currentTarget.style.boxShadow = "none";}} />
									</div>
								</div>
							</div>

							{/* Password Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label className="block text-xs font-bold tracking-wider uppercase pl-1" htmlFor="password" style={{color: "#5f6368"}}>Password</label>
									<div className="relative">
										<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]" data-icon="lock" style={{color: "#727787"}}>lock</span>
										<input className="w-full pl-12 pr-4 py-3.5 border-none rounded-xl focus:ring-2 transition-all duration-200 placeholder:text-outline/60 text-sm outline-none" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}} id="password" name="password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} onFocus={(e) => {e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)";}} onBlur={(e) => {e.currentTarget.style.backgroundColor = "#f3f3f7"; e.currentTarget.style.boxShadow = "none";}} />
									</div>
								</div>
								<div className="space-y-2">
									<label className="block text-xs font-bold tracking-wider uppercase pl-1" htmlFor="confirm_password" style={{color: "#5f6368"}}>Confirm Password</label>
									<div className="relative">
										<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[20px]" data-icon="verified_user" style={{color: "#727787"}}>verified_user</span>
										<input className="w-full pl-12 pr-4 py-3.5 border-none rounded-xl focus:ring-2 transition-all duration-200 placeholder:text-outline/60 text-sm outline-none" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}} id="confirm_password" name="confirm_password" placeholder="••••••••" type={showPassword ? "text" : "password"} value={formData.confirm_password} onChange={handleChange} onFocus={(e) => {e.currentTarget.style.backgroundColor = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)";}} onBlur={(e) => {e.currentTarget.style.backgroundColor = "#f3f3f7"; e.currentTarget.style.boxShadow = "none";}} />
									</div>
								</div>
							</div>
							{/* Terms Agreement */}
							<div className="flex flex-col items-start gap-3">
								<div className="flex gap-2">
									<input className="mt-1 rounded cursor-pointer" style={{accentColor: "#0057cd", borderColor: "#c2c6d8", backgroundColor: "#f3f3f7"}} id="show_password" name="show_password" type="checkbox" checked={showPassword} onChange={() => setShowPassword(prev => !prev)} />
									<label className="text-xs leading-relaxed cursor-pointer" style={{color: "#5f6368"}} htmlFor="show_password">
										Show Password
									</label>
								</div>
								<div className="flex gap-2">
									<input className="mt-1 rounded cursor-pointer" style={{accentColor: "#0057cd", borderColor: "#c2c6d8", backgroundColor: "#f3f3f7"}} id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} />
									<label className="text-xs leading-relaxed cursor-pointer" style={{color: "#5f6368"}} htmlFor="terms">
										I agree to the <a className="font-semibold hover:underline" href="#" style={{color: "#0057cd"}}>Terms of Service</a> and <a className="font-semibold hover:underline" href="#" style={{color: "#0057cd"}}>Privacy Policy</a>.
									</label>
								</div>
							</div>

							{/* Primary Action */}
							<button className="w-full py-4 font-headline font-bold rounded-xl shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" style={{background: "linear-gradient(to right, #0057cd, #0d6efd)", color: "#ffffff", boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)"}} type="submit" disabled={isLoading} onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"} onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}>
								{isLoading ? "Registering..." : "Register"}
							</button>
						</form>

						{/* Footer Link */}
						<div className="mt-8 text-center">
							<p className="text-sm" style={{color: "#5f6368"}}>
								Already have an account? 
								<a className="font-bold hover:opacity-80 ml-1 transition-opacity" href="/login" style={{color: "#0057cd"}}>Sign In</a>
							</p>
						</div>
					</div>

					{/* Accessibility Note / Trust Badge */}
					<div className="mt-8 flex justify-center items-center gap-6" style={{color: "rgba(114, 119, 135, 0.6)"}}>
						<div className="flex items-center gap-2">
							<span className="material-symbols-outlined text-[20px]" data-icon="encrypted">encrypted</span>
							<span className="text-[10px] font-bold tracking-widest uppercase">HIPAA Compliant</span>
						</div>
						<div className="w-1 h-1 rounded-full" style={{backgroundColor: "rgba(114, 119, 135, 0.2)"}}></div>
						<div className="flex items-center gap-2">
							<span className="material-symbols-outlined text-[20px]" data-icon="security">security</span>
							<span className="text-[10px] font-bold tracking-widest uppercase">256-bit SSL</span>
						</div>
					</div>
				</div>
			</main>

			{/* Footer Component */}
			<footer className="w-full border-t" style={{borderColor: "#e2e2e6", backgroundColor: "#f3f3f7"}}>
				<div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto w-full">
					<p className="text-xs" style={{color: "#727787"}}>© 2024 MedReserve Clinical Systems. All rights reserved.</p>
					<div className="flex flex-wrap justify-center gap-8">
						<a className="text-xs hover:opacity-80 transition-opacity" href="#" style={{color: "#727787", textDecoration: "underline", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}>Privacy Policy</a>
						<a className="text-xs hover:opacity-80 transition-opacity" href="#" style={{color: "#727787", textDecoration: "underline", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}>Terms of Service</a>
						<a className="text-xs hover:opacity-80 transition-opacity" href="#" style={{color: "#727787", textDecoration: "underline", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}>Contact Support</a>
						<a className="text-xs hover:opacity-80 transition-opacity" href="#" style={{color: "#727787", textDecoration: "underline", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}>Healthcare Partners</a>
					</div>
				</div>
			</footer>
		</div>
	);
}
