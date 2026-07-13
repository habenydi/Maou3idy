export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

// 'use client';
// import { toast } from "react-toastify";
// import { useAuth } from "../layout";
// import { useRouter } from "next/navigation";

// export default function DoctorLayout({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!user || user.role !== "DOCTOR") {
//     toast.error("You are not authorized to access this page.");
//     router.push("/");
//   }
//   return <>{children}</>;
// }     this is the function that checks if the user is a doctor and if not redirects them to the home page. It is currently commented out because it is not needed for the doctor registration page.