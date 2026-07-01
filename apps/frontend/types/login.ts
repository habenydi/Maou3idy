export interface LoginFormProps {
	setUser: (user: User) => void;
}

export interface User {
	id: number;
	email: string;
	role: "PATIENT" | "DOCTOR" | "ADMIN";
	firstName?: string;
	lastName?: string;
}