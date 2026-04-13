import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://127.0.0.1:8080/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(
					data.message ||
					(data.errors && Object.values(data.errors)[0][0]) ||
					"Login failed"
				);
			}

			localStorage.setItem("access_token", data.access_token);
			navigate("/success");

		} catch (err) {
			console.error(err);
			alert(err.message);
		}
	};

	return (
		<div className="bg-surface font-body text-on-surface min-h-screen flex items-center justify-center p-6 overflow-x-hidden">
			{/* Ambient Background Decorations */}
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
				<div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full bg-secondary/5 blur-[100px]"></div>
				<div className="absolute top-[20%] right-[15%] w-[100px] h-[100px] rounded-full bg-tertiary-fixed blur-[60px] opacity-20"></div>
			</div>

			{/* Login Container */}
			<main className="w-full max-w-[480px]">
				{/* Brand Identity */}
				<div className="flex flex-col items-center mb-10">
					<div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary-container shadow-sm">
						<span className="material-symbols-outlined text-on-primary-container text-2xl" data-icon="medical_services">medical_services</span>
					</div>
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter text-on-surface">
						MedReserve
					</h1>
				</div>

				{/* Login Card */}
				<div className="glass-panel rounded-xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12">
					<header className="mb-8 text-center">
						<h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-2">Welcome Back</h2>
						<p className="text-on-surface-variant text-sm font-medium">Please enter your credentials to access your clinical dashboard.</p>
					</header>

					<form className="space-y-6" onSubmit={handleLogin}>
						{/* Email Field */}
						<div className="space-y-2">
							<label className="block text-xs font-semibold text-on-surface uppercase tracking-wider" htmlFor="email">Email Address</label>
							<div className="relative">
								<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
									<span className="material-symbols-outlined text-[20px]" data-icon="mail">mail</span>
								</span>
								<input
									className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200 outline-none font-medium"
									id="email"
									name="email"
									placeholder="dr.wilson@medreserve.com"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						{/* Password Field */}
						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<label className="block text-xs font-semibold text-on-surface uppercase tracking-wider" htmlFor="password">Password</label>
								<button
									type="button"
									onClick={() => navigate('/forgot-password')}
									className="text-xs font-bold text-primary hover:text-primary-container transition-colors duration-200"
								>
									Forgot password?
								</button>
							</div>
							<div className="relative">
								<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
									<span className="material-symbols-outlined text-[20px]" data-icon="lock">lock</span>
								</span>
								<input
									className="w-full pl-12 pr-12 py-4 bg-surface-container-low border-none rounded-xl text-on-surface placeholder:text-outline/60 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-200 outline-none font-medium"
									id="password"
									name="password"
									placeholder="••••••••"
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-on-surface-variant transition-colors"
								>
									<span className="material-symbols-outlined text-[20px]" data-icon="visibility">visibility</span>
								</button>
							</div>
						</div>

						{/* Options */}
						<div className="flex items-center">
							<input
								className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 bg-surface-container-low"
								id="remember"
								name="remember"
								type="checkbox"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
							/>
							<label className="ml-2 text-sm font-medium text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Remember me for 30 days</label>
						</div>

						{/* Action Button */}
						<button
							type="submit"
							className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
						>
							Sign In
							<span className="material-symbols-outlined text-[20px]" data-icon="arrow_forward">arrow_forward</span>
						</button>
					</form>

					{/* Secondary Action */}
					<div className="mt-8 text-center">
						<button
							type="button"
							className="text-sm font-medium text-on-surface-variant"
						>
							Don't have an account? 
							<span
								onClick={() => navigate('/register')}
								className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/30 ml-1 cursor-pointer"
							>
								Sign Up
							</span>
						</button>
					</div>
				</div>

				{/* Footer */}
				<footer className="mt-12">
					<div className="flex flex-wrap justify-center gap-6 mb-6">
						<a className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
						<a className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
						<a className="text-xs font-medium text-on-surface-variant hover:text-primary transition-colors" href="#">Contact Support</a>
					</div>
					<p className="text-center text-[10px] text-outline font-medium tracking-wide uppercase">
						© 2024 MedReserve Clinical Systems. All rights reserved.
					</p>
				</footer>
			</main>

			{/* Contextual Aesthetic Element */}
			<div className="hidden lg:block fixed top-1/2 -right-24 -translate-y-1/2 w-64 h-96 opacity-10">
				<img
					alt="Clinical environment"
					className="w-full h-full object-cover rounded-3xl grayscale"
					data-alt="Modern high-tech medical clinic interior with clean white surfaces and soft blue ambient lighting in a professional setting"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkHqkkpwr0eOnMgQc0OIf1L61TFcolCMTHxPm6BOqSKDRiZcSBj5i0SSx5YDrAaRtArjRlEEHUaSO-JlNGidngNLDvErm3f5oeqkg1OzfboKqwUC-o41oEq7TrP5w_f5_Lt9qOBSQgwipkNsgr4WGewltB2UuyVvXBEInZ_1wKX4tfdXTHXcysVLmGXmgFc_3PXZR-w0MjOE1pmCAFP5ZNg4Scl11cIBqnBVqLdjq-xpAgysxmGbsDU-fYCERKJBXnoXv8DACFh5w"
				/>
			</div>
		</div>
	);
}

export default LoginPage;
