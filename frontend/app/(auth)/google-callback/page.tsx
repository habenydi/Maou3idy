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
      localStorage.setItem("access_token", token);
      localStorage.setItem("user_id", userId || "");
      toast.success("Login successful!");
      router.push("/success");
    } else {
      toast.error("Login failed");
      router.push("/register");
    }
  }, [searchParams, router]);

  return <div>Processing login...</div>;
}
