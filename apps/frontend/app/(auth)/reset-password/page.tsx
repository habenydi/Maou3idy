"use client";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const resetSchema = z.object({
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirmPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
	path: ["confirmPassword"],
	message: "Passwords do not match",
});

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPassword() {
	const { register, handleSubmit, formState: { errors } } = useForm<ResetForm>({
		resolver: zodResolver(resetSchema),
	});
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const onSubmit = async (data: ResetForm) => {
		if (!token) {
			const message = "Reset token is missing. Please request a new password reset link.";
			toast.error(message);
			return;
		}

		setLoading(true);
		try {
			const response = await axios.patch(
				`http://localhost:1337/auth/reset-password/token=${token}`,
				{ new_password: data.password },
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				}
			);
			const message = response.data?.message || "Password has been reset successfully";
			toast.success(message);
			router.push("/success");

		} catch (err) {
			console.error(err);
			const message = axios.isAxiosError(err) && err.response?.data?.message
				? err.response.data.message
				: err instanceof Error
						? err.message
						: "An unknown error occurred.";
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
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Reset Password</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Enter your new password</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="password" style={{color: "#191c1e"}}>New Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="password"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								{...register('password')}
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
							{errors.password && <p className="text-xs" style={{color: "#dc2626"}}>{errors.password.message}</p>}
						</div>

						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="confirmPassword" style={{color: "#191c1e"}}>Confirm Password</label>
							<input
								className="w-full px-4 py-4 border-none rounded-xl outline-none font-medium" style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
								id="confirmPassword"
								placeholder="••••••••"
								type={showPassword ? "text" : "password"}
								{...register('confirmPassword')}
								onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
								onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
							/>
							{errors.confirmPassword && <p className="text-xs" style={{color: "#dc2626"}}>{errors.confirmPassword.message}</p>}
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
