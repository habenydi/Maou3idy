"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ChangePassword() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage(null);

		if (newPassword !== confirmPassword) {
			setErrorMessage("New passwords do not match");
			setLoading(false);
			return;
		}

		try {
			const token = localStorage.getItem('access_token');
			if (!token) {
				router.push("/login");
				return;
			}

			await axios.patch(
				"http://127.0.0.1:8000/auth/change-password",
				{ old_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmPassword },
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": `Bearer ${token}`,
					},
				}
			);

			alert("Password changed successfully");
			router.push("/success");

		} catch (err: unknown) {
			console.error(err);
			if (axios.isAxiosError(err) && err.response?.data?.message) {
				setErrorMessage(err.response.data.message);
			} else if (err instanceof Error) {
				setErrorMessage(err.message);
			} else {
				setErrorMessage("Failed to change password");
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
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Change Password</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Update your account password</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="currentPassword" style={{color: "#191c1e"}}>Current Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="currentPassword"
								name="currentPassword"
								autoComplete="current-password"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
								required
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="newPassword" style={{color: "#191c1e"}}>New Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="newPassword"
								name="newPassword"
								autoComplete="new-password"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="confirmPassword" style={{color: "#191c1e"}}>Confirm New Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="confirmPassword"
								name="confirmPassword"
								autoComplete="new-password"
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

						{errorMessage && (
							<div className="rounded-lg px-4 py-3 text-sm font-medium" style={{backgroundColor: "#ffe6e6", color: "#8b0000"}}>
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
							{loading ? "Changing..." : "Change Password"}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-sm font-medium" style={{color: "#424655"}}>
							<span
								onClick={() => router.push('/success')}
								className="font-bold hover:underline underline-offset-4 cursor-pointer" style={{color: "#0057cd", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}
								onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
								onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
							>
								Back to Dashboard
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
