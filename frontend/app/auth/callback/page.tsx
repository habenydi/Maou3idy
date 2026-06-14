"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userBase64 = searchParams.get("user");

    if (token && userBase64) {
      try {
        const user = JSON.parse(
          Buffer.from(userBase64, "base64").toString("utf-8")
        );
        localStorage.setItem("access_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        toast.success("Login successful!");
        router.push("/success");
      } catch (error) {
        console.error("Failed to parse user data:", error);
        toast.error("Login failed - invalid data");
        router.push("/register");
      }
    } else {
      toast.error("Login failed - missing token");
      router.push("/register");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Processing login...</p>
    </div>
  );
}
