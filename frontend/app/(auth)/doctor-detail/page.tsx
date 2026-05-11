"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorDetail() {
	const [doctors, setDoctors] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const fetchDoctors = async () => {
			try {
				const token = localStorage.getItem('access_token');
				if (!token) {
					router.push("/auth");
					return;
				}

				const res = await fetch("http://127.0.0.1:8000/auth/doctors", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": `Bearer ${token}`,
					},
				});

				if (!res.ok) {
					throw new Error("Failed to fetch doctors");
				}

				const data = await res.json();
				setDoctors(data.data || []);

			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchDoctors();
	}, [router]);

	return (
		<div className="font-body min-h-screen p-6" style={{backgroundColor: "#f9f9fd", color: "#191c1e"}}>
			<main className="w-full max-w-6xl mx-auto">
				<div className="flex flex-col items-start mb-10">
					<h1 className="font-headline text-2xl font-extrabold tracking-tighter" style={{color: "#191c1e"}}>
						Doctors Directory
					</h1>
					<button
						onClick={() => router.push('/success')}
						className="mt-4 font-bold hover:underline underline-offset-4" style={{color: "#0057cd"}}
					>
						← Back to Dashboard
					</button>
				</div>

				{loading ? (
					<div className="flex justify-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{borderColor: "#0057cd"}}></div>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{doctors.map((doctor) => (
							<div key={doctor.id} className="glass-panel rounded-xl p-6">
								<h3 className="font-headline text-lg font-bold mb-2" style={{color: "#191c1e"}}>{doctor.name}</h3>
								<p className="text-sm mb-2" style={{color: "#424655"}}>{doctor.specialization}</p>
								<p className="text-sm mb-4" style={{color: "#424655"}}>{doctor.email}</p>
								<button
									onClick={() => {
										// Handle booking or detail navigation
									}}
									className="w-full py-2 px-4 font-bold rounded-lg transition-all" style={{backgroundColor: "#0057cd", color: "#ffffff", borderRadius: "24px"}}
									onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 87, 205, 0.3)"}
									onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
								>
									View Details
								</button>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
