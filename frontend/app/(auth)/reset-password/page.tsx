"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPassword() {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const res = await fetch(`http://127.0.0.1:8080/api/reset-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				body: JSON.stringify({ token, password }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Failed to reset password");
			}

			alert("Password has been reset successfully");
			router.push("/login");

		} catch (err) {
			console.error(err);
			if (err instanceof Error) {
				alert(err.message);
			} else {
				alert("An unknown error occurred.");
			}
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
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Reset Password</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Enter your new password</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="password" style={{color: "#191c1e"}}>New Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="password"
								name="password"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="confirmPassword" style={{color: "#191c1e"}}>Confirm Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="confirmPassword"
								name="confirmPassword"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
						</div>

						<div className="flex items-center">
							<input
								className="w-4 h-4 rounded" style={{accentColor: "#0057cd", borderColor: "#c2c6d8", backgroundColor: "#f3f3f7"}}
								id="showPassword"
								type="checkbox"
								checked={showPassword}
								onChange={(e) => setShowPassword(e.target.checked)}
							/>
							<label className="ml-2 text-sm font-medium cursor-pointer select-none" htmlFor="showPassword" style={{color: "#424655"}}>Show password</label>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]" 
							style={{backgroundColor: "#0057cd", color: "#ffffff", boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)", opacity: loading ? 0.5 : 1, borderRadius: "24px"}}
							onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"}
							onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}
						>
							{loading ? "Resetting..." : "Reset Password"}
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}
