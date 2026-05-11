"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerificationEmail() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const [message, setMessage] = useState('Verifying your email address...');

	useEffect(() => {
		if (!token) {
			setStatus('error');
			setMessage('Verification token is missing.');
			return;
		}

		const verifyEmail = async () => {
			try {
				const response = await fetch(`http://localhost:8000/auth/verify_email/token=${encodeURIComponent(token)}`);
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || 'Failed to verify email');
				}

				setStatus('success');
				setMessage(data.message || 'Email verified successfully.');
				setTimeout(() => {
					router.replace('/login');
				}, 2000);
			} catch (error) {
				setStatus('error');
				setMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
			}
		};

		verifyEmail();
	}, [router, token]);

	return (
		<div className="font-body min-h-screen flex items-center justify-center p-6 overflow-x-hidden" style={{ backgroundColor: '#f9f9fd', color: '#191c1e' }}>
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(0, 87, 205, 0.05)' }}></div>
				<div className="absolute -bottom-[10%] -right-[10%] w-[35%] h-[35%] rounded-full blur-[100px]" style={{ backgroundColor: 'rgba(66, 92, 155, 0.05)' }}></div>
				<div className="absolute top-[20%] right-[15%] w-25 h-25 rounded-full blur-[60px] opacity-20" style={{ backgroundColor: '#ffdbce' }}></div>
			</div>

			<main className="w-full max-w-120">
				<div className="flex flex-col items-center mb-10">
					<div className="mb-4 flex items-center justify-center w-12 h-12 rounded-4xl shadow-sm" style={{ backgroundColor: '#0d6efd' }}>
						<span className="material-symbols-outlined text-2xl" data-icon="medical_services" style={{ color: '#ffffff' }}>medical_services</span>
					</div>
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter" style={{ color: '#191c1e' }}>
						MedReserve
					</h1>
				</div>

				<div className="glass-panel rounded-2xl shadow-[0_12px_40px_rgba(0,87,206,0.06)] p-8 md:p-12 text-center">
					<div className="flex flex-col items-center gap-4">
						<div className="flex items-center justify-center w-20 h-20 rounded-full" style={{ backgroundColor: status === 'success' ? 'rgba(34, 197, 94, 0.12)' : status === 'error' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(0, 87, 205, 0.1)' }}>
							<span className="material-symbols-outlined text-5xl" style={{ color: status === 'success' ? '#16a34a' : status === 'error' ? '#dc2626' : '#0057cd' }}>
								{status === 'success' ? 'verified' : status === 'error' ? 'error' : 'mail'}
							</span>
						</div>
						<h2 className="font-headline text-3xl font-bold tracking-tight" style={{ color: '#191c1e' }}>
							Email Verification
						</h2>
						<p className="text-sm font-medium" style={{ color: '#424655' }}>
							{message}
						</p>
						{status === 'loading' ? (
							<p className="text-xs" style={{ color: '#727787' }}>Please wait while we confirm your account.</p>
						) : null}
					</div>
				</div>
			</main>
		</div>
	);
}
