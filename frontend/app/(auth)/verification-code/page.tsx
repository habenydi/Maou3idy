"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VerificationCodePage() {
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to verify your email.");
            setLoading(false);
            return;
        }
		try {
			const res = await fetch("http://127.0.0.1:8000/auth/verify-code", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({ email, code }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Verification failed");
			}
            alert("Email verified successfully");
			router.push("/success");

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
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Verify Your Email</h2>
						<p className="text-sm font-medium" style={{color: "#424655"}}>Enter the verification code sent to your email address</p>
					</header>

					<form className="space-y-6" onSubmit={handleSubmit}>
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
									placeholder="your@email.com" 
									type="email" 
									value={email} 
									onChange={(e) => setEmail(e.target.value)} 
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="block text-xs font-semibold uppercase tracking-wider" htmlFor="code" style={{color: "#191c1e"}}>Verification Code</label>
							<div className="relative">
								<span className="absolute inset-y-0 left-4 flex items-center pointer-events-none" style={{color: "#727787"}}>
									<span className="material-symbols-outlined text-[20px]" data-icon="verified">verified</span>
								</span>
								<input 
									className="w-full pl-12 pr-4 py-4 border-none rounded-xl placeholder:text-outline/60 transition-all duration-200 outline-none font-medium" 
									style={{backgroundColor: "#f3f3f7", color: "#191c1e"}}
									onFocus={(e) => {e.currentTarget.style.boxShadow = "0 0 0 2px rgba(0, 87, 205, 0.2)"; e.currentTarget.style.backgroundColor = "#ffffff";}}
									onBlur={(e) => {e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.backgroundColor = "#f3f3f7";}}
									id="code" 
									name="code" 
									placeholder="Enter 6-digit code" 
									type="text" 
									value={code} 
									onChange={(e) => setCode(e.target.value)} 
									maxLength={6}
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full py-4 px-6 font-bold rounded-xl transition-all duration-200 active:scale-[0.98]" 
							style={{backgroundColor: "#0057cd", color: "#ffffff", boxShadow: "0 8px 16px rgba(0, 87, 205, 0.2)", opacity: loading ? 0.5 : 1, borderRadius: "24px"}}
							onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 87, 205, 0.3)"}
							onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.2)"}
						>
							{loading ? "Verifying..." : "Verify Code"}
						</button>
					</form>

					<div className="mt-8 text-center">
						<p className="text-sm font-medium" style={{color: "#424655"}}>
							<span
								onClick={() => router.push('/forgot-password')}
								className="font-bold hover:underline underline-offset-4 cursor-pointer" style={{color: "#0057cd", textDecorationColor: "rgba(0, 87, 205, 0.3)"}}
								onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
								onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
							>
								Didn't receive a code? Request a new one
							</span>
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}