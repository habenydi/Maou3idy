import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { toast } from "react-toastify";

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("access_token")?.value;
  console.log("DoctorLayout token:", token);

  if (!token) {
    redirect("/login");
  }

  const secret = new TextEncoder().encode(
    "Yassir_SecretKey"
  );

  try {
    const { payload } = await jwtVerify(token, secret);

    if ((payload.role )!== "DOCTOR" && (payload.role )!== "ADMIN") {
      redirect("/unauthorized");
    }
  } catch {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}