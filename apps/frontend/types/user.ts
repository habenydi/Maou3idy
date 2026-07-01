export interface UserRow {
  id: number;
  name: string;
  email: string;
  role: "Doctor" | "Patient";
  status: "Active" | "Inactive";
  joinDate: string;
  avatar: string;
}