"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Img from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../layout';

export default function Success() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { user, loading } = useAuth();

	console.log("User data in Success page:", user);
	
	useEffect(() => {
		if (loading) {
			return;
		}
		if (!user) {
			router.push("/login");
		}
	}, [user, loading, router]);
	if (loading || !user) {
		return null;
	}

	const handleAdmin = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get("http://localhost:1337/users", {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				withCredentials: true,
			});
			console.log(data);
			toast.success("Admin access successful! Check console for user data.");
		} catch (error) {
			console.error("Error fetching users:", error);
			if (axios.isAxiosError(error) && error.response?.status === 403) {
				toast.error("Access denied. You do not have permission to view this resource.");
			}
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				toast.error("Unauthorized. Please log in again.");
				router.push("/login");
			}
		}
	};

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await axios.post("http://localhost:1337/auth/logout", {}, {
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
				},
				withCredentials: true,
			});
			setIsLoading(false);
			toast.success("Logout successful! Redirecting to login page...");
			router.push("/login");
		} catch (error) {
			console.error("Error during logout:", error);
			setIsLoading(false);
			toast.error("Logout failed. Please try again.");
		}
	};

	const handleReset = () => {
        router.push("/change-password");
	};

	return (
		<div className="font-body min-h-screen flex items-center justify-center p-6 overflow-x-hidden" style={{backgroundColor: "#f9f9fd", color: "#191c1e"}}>
			{/* Ambient Background Decorations */}
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{backgroundColor: "rgba(0, 87, 205, 0.05)"}}></div>
				<div className="absolute bottom-[10%] right-[10%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{backgroundColor: "rgba(66, 92, 155, 0.05)"}}></div>
				<div className="absolute top-[20%] right-[15%] w-25 h-25 rounded-full blur-[60px] opacity-20" style={{backgroundColor: "#ffdbce"}}></div>
			</div>

			{/* Success Container */}
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

				{/* Success Card */}
				<div className="glass-panel rounded-2xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12">
					<div className="flex flex-col items-center mb-8">
						<div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full" style={{backgroundColor: "rgba(0, 87, 205, 0.1)"}}>
							<span className="material-symbols-outlined text-5xl" data-icon="check_circle" style={{color: "#0057cd"}}>check_circle</span>
						</div>
						<h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-2" style={{color: "#191c1e"}}>Success!</h2>
						<p className="text-sm font-medium text-center" style={{color: "#424655"}}>You have successfully logged in to your clinical dashboard.</p>
					</div>

					{/* Welcome Message */}
					<div className="bg-white/50 rounded-xl p-6 mb-8 text-center">
						<p className="text-lg font-semibold mb-2" style={{color: "#191c1e"}}>Welcome to MedReserve</p>
						<p className="text-sm" style={{color: "#727787"}}>Your account is now active and ready to use. You can manage your appointments, patient records, and clinic settings.</p>
					</div>

					{/* Email Verification Status */}
					<div className="rounded-xl border p-6 mb-8" style={{backgroundColor: "#ffffff", borderColor: "#e5e7eb"}}>
						<div className="flex items-center justify-between gap-4 mb-3">
							<div>
								<p className="text-sm font-semibold uppercase tracking-wider" style={{color: "#424655"}}>Email</p>
								<p className="text-sm mt-1" style={{color: "#727787"}}>{user?.email || 'Account email'}</p>
							</div>
							<div className="px-3 py-1 rounded-full text-xs font-bold" style={{backgroundColor: user?.verified ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)', color: user?.verified ? '#16a34a' : '#dc2626'}}>
								{user?.verified ? 'Verified' : 'Not verified'}
							</div>
						</div>
						<p className="text-sm" style={{color: "#424655"}}>
							{user?.verified
								? 'Your email has been verified successfully.'
								: 'Please check your email inbox and click the verification link to activate your account.'}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="space-y-4">
						{/* Reset Button */}
						<button 
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] border-2" 
							style={{
								backgroundColor: "#f3f3f7",
								color: "#0057cd",
								borderColor: "#0057cd",
								boxShadow: "0 4px 12px rgba(0, 87, 205, 0.1)"
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.backgroundColor = "#ffffff";
								e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.backgroundColor = "#f3f3f7";
								e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 87, 205, 0.1)";
							}}
							onClick={handleReset}
							disabled={isLoading}
						>
							<span className="material-symbols-outlined text-[20px]" data-icon="refresh">refresh</span>
							Change Password
						</button>
						<button className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98] border-2" onClick={handleAdmin} style={{color: "#424655"}} onMouseEnter={(e) => e.currentTarget.style.color = "#0057cd"} onMouseLeave={(e) => e.currentTarget.style.color = "#424655"}>Admin: test the roles of the Admin</button>

						{/* Logout Button */}
						<button 
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]" 
							style={{
								background: "linear-gradient(to right, #0057cd, #0d6efd)",
								color: "#ffffff",
								boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)",
								borderRadius: "24px"
							}}
							onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"}
							onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}
							onClick={handleLogout}
							disabled={isLoading}
						>
							<span className="material-symbols-outlined text-[20px]" data-icon="logout">logout</span>
							{isLoading ? "Logging out..." : "Logout"}
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

			{/* Contextual Aesthetic Element */}
			<div className="hidden lg:block fixed top-1/2 -right-24 -translate-y-1/2 w-64 h-96 opacity-10">
				<Img 
					alt="Clinical environment" 
					width={40}
					height={40}
					className="w-full h-full object-cover rounded-3xl grayscale hd-hide-temp" 
					data-alt="Modern high-tech medical clinic interior with clean white surfaces and soft blue ambient lighting in a professional setting" 
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkHqkkpwr0eOnMgQc0OIf1L61TFcolCMTHxPm6BOqSKDRiZcSBj5i0SSx5YDrAaRtArjRlEEHUaSO-JlNGidngNLDvErm3f5oeqkg1OzfboKqwUC-o41oEq7TrP5w_f5_Lt9qOBSQgwipkNsgr4WGewltB2UuyVvXBEInZ_1wKX4tfdXTHXcysVLmGXmgFc_3PXZR-w0MjOE1pmCAFP5ZNg4Scl11cIBqnBVqLdjq-xpAgysxmGbsDU-fYCERKJBXnoXv8DACFh5w" 
				/>
			</div>
		</div>
	);
}
