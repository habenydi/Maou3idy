"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("id");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userId || "");
      toast.success("Login successful! merhba bik");
      router.push("/patients/landingpage");
    } else {
      toast.error("Login failed");
      router.push("/register");
    }
  }, [searchParams, router]);

  return <div>Processing login...</div>;
}
