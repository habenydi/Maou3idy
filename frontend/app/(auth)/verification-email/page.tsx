"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerificationEmail() {
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("Verifying your email...");
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				if (!token) {
					setMessage("No verification token provided");
					setLoading(false);
					return;
				}

				const res = await fetch("http://127.0.0.1:8080/api/verify-email", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					body: JSON.stringify({ token }),
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.message || "Email verification failed");
				}

				setMessage("Email verified successfully! Redirecting to login...");
				setTimeout(() => {
					router.push("/login");
				}, 2000);

			} catch (err) {
				console.error(err);
				if (err instanceof Error) {
					setMessage(`Verification failed: ${err.message}`);
				} else {
					setMessage("An unknown error occurred.");
				}
			} finally {
				setLoading(false);
			}
		};

		verifyEmail();
	}, [token, router]);

	return (
		<div className="font-body min-h-screen flex items-center justify-center p-6" style={{backgroundColor: "#f9f9fd", color: "#191c1e"}}>
			<main className="w-full max-w-120">
				<div className="flex flex-col items-center mb-10">
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter" style={{color: "#191c1e"}}>
						MedReserve
					</h1>
				</div>

				<div className="glass-panel rounded-xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12 text-center">
					<header className="mb-8">
						<h2 className="font-headline text-3xl font-bold tracking-tight mb-2" style={{color: "#191c1e"}}>Email Verification</h2>
					</header>

					<div className="space-y-4">
						{loading && (
							<div className="flex justify-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: "#0057cd"}}></div>
							</div>
						)}
						<p className="text-sm font-medium" style={{color: "#424655"}}>{message}</p>
					</div>
				</div>
			</main>
		</div>
	);
}
