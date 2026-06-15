"use client";
import axios from 'axios';
import Login from './(auth)/login/page'
import { toast } from 'react-toastify';

export default function Home() {
	// return <Login />;
	const handlebuttomClick = async () => {
		try {
			console.log("Registering user...");
			const { data } = await axios.post(
				"http://localhost:1337/auth/register",
				{
					name: "John Doe",
					email: "yassir@gmail.com",
					password: "password123",
					phone: "1234567890",
				},
				{
					
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
					withCredentials: true,
				},
			);
			console.log("User registered successfully:", data);
			toast.success("Registration successful! Redirecting...")
			return <Login />;
		} catch (error) {
			console.error("Error registering user:", error);
			toast.error("Error registering user");
		}
	};
	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen py-2 text-2xl text-blue-500 border-solid border-2 border-blue-500 rounded-lg shadow-lg">
				<button onClick={handlebuttomClick}>Register</button>
			</div>
		</>
	)
}
