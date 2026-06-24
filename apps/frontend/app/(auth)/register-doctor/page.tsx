'use client';

import Img from "next/image";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";

const registerDoctorSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .email("Enter a valid email address")
    .refine((value) => value.includes("@"), "Please enter a valid email address. It should contain '@'.")
    .refine((value) => /\.(com|ma)$/i.test(value), "Email must end with .com or .ma"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  speciality: z.string().min(1, "Specialty is required"),
  license_number: z.string().min(1, "License number is required"),
  years_of_experience: z.number().min(0),
  bio: z.string().min(1, "Brief bio is required"),
  phone: z.string().min(1, "Phone number is required"),
});

type RegisterDoctorForm = z.infer<typeof registerDoctorSchema>;

function RegisterDoctor() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterDoctorForm>({
    resolver: zodResolver(registerDoctorSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [medicalLicense, setMedicalLicense] = useState<File | null>(null);
  const [medicalLicenseError, setMedicalLicenseError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMedicalLicenseError(null);

    if (!file) {
      setMedicalLicense(null);
      return;
    }

    const validTypes = ["application/pdf", "image/png", "image/jpeg"];
    const maxSize = 10 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setMedicalLicenseError("File must be PDF, PNG, or JPG");
      setMedicalLicense(null);
      return;
    }

    if (file.size > maxSize) {
      setMedicalLicenseError("File size must not exceed 10MB");
      setMedicalLicense(null);
      return;
    }

    setMedicalLicense(file);
  };

const onSubmit = async (data: RegisterDoctorForm) => {
  console.log(data);
    if (!medicalLicense) {
      setMedicalLicenseError("Medical license file is required");
      return;
    }

    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", data.name);
      payload.append("email", data.email);
      payload.append("password", data.password);
      payload.append("speciality", data.speciality);
      payload.append("license_number", data.license_number);
      payload.append("years_of_experience", String(data.years_of_experience));
      payload.append("bio", data.bio);
      payload.append("phone", data.phone);
      payload.append("medical_license", medicalLicense);

      for (const [key, value] of payload.entries()) {
        console.log(key, value);
      }

      const { data: responseData } = await axios.post(
        "http://localhost:1337/auth/doctor-register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Registration successful! we will contact you shortly.");
      setMedicalLicense(null);
      router.push("/patients/landingpage");
    } catch (error) {
        if (axios.isAxiosError(error)) {
          const backendMessage = error.response?.data?.message;

          toast.error(
            Array.isArray(backendMessage)
              ? backendMessage.join(", ")
              : backendMessage || "Request failed"
          );
        } else {
          toast.error("An unexpected error occurred");
        }

  setIsLoading(false);
  }
  };

  return (
    <>
      <Navbar activeLink="doctors" showAuthButtons={true} />
      <main className="pt-24 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-5 space-y-8 pt-12">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold tracking-widest uppercase">
                Professional Network
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-on-background tracking-tight leading-[1.1]">
                Partner with clinical excellence.
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                Join over 12,000 board-certified specialists using MedReserve to
                streamline their digital practice and connect with patients.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary-fixed-dim p-3 rounded-xl text-primary">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Verified Identity</h3>
                  <p className="text-sm text-on-surface-variant">
                    Secure credential verification for patient trust.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary-fixed-dim p-3 rounded-xl text-primary">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Practice Analytics</h3>
                  <p className="text-sm text-on-surface-variant">
                    Real-time data on patient bookings and retention.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl h-64 shadow-xl">
              <Img
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 object-cover"
                alt="Modern medical office with glass walls, clean minimalist interior, and a professional doctor holding a tablet in a soft lit environment"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuxGWOK3Rac8eDP76IXKsXa1MlbxnjHvgmeBpoTuCvnITlEUUekdeDiY7xbRssnn3HJb7v4C155JzPsub59XW_bREF8VjDuubuWsegRqZDWY6lpEC-VtgknwD0hJoLOXQpijuE5HUD3Fvz8wAWRt4bsooVX4aLNx9uu-2DN32P5p4rR-s4GY-aAXbGi9k_mAprlxCiOj1ZxXx7-T7w37hKLIeU_7azJwujTiDRvuwV_hYR4NWPDrO6tgLkD6YVs6jkHwdSpvXjrL0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <p className="text-white font-medium italic text-sm">
                  &quot;MedReserve has transformed how I manage my cardiologist clinic in
                  Manhattan.&quot;
                </p>
                <p className="text-white/80 text-xs mt-2">— Dr. Elena Rossi</p>
              </div>
            </div>
          </section>
          <section className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-sm border-0">
              <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      person_add
                    </span>
                    Registration Details
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Please provide your primary clinical contact information.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="name"
                      placeholder="Dr. Jane Smith"
                      type="text"
                      {...register('name')}
                    />
                    {errors.name && <p className="text-xs" style={{color: "#dc2626"}}>{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="email">
                      Professional Email
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="email"
                      placeholder="jane.smith@clinic.com"
                      {...register('email')}
                    />
                    {errors.email && <p className="text-xs" style={{color: "#dc2626"}}>{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="password"
                      type="password"
                      {...register('password')}
                    />
                    {errors.password && <p className="text-xs" style={{color: "#dc2626"}}>{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="phone"
                      placeholder="+212 6123-45678"
                      type="tel"
                      {...register('phone')}
                    />
                    {errors.phone && <p className="text-xs" style={{color: "#dc2626"}}>{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="speciality">
                      Specialty
                    </label>
                    <select
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none"
                      id="speciality"
                      {...register('speciality')}
                    >
                      <option value="">Select Specialty</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                    {errors.speciality && <p className="text-xs" style={{color: "#dc2626"}}>{errors.speciality.message}</p>}
                  </div>
                </div>
                <div className="bg-surface-container p-1px" />
                <div>
                  <h2 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      workspace_premium
                    </span>
                    Clinical Details
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Verify your professional medical background.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="license-number">
                      License Number
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="license-number"
                      placeholder="MD-XXXX-XXXX"
                      type="text"
                      {...register('license_number')}
                    />
                    {errors.license_number && <p className="text-xs" style={{color: "#dc2626"}}>{errors.license_number.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="experience">
                      Years of Experience
                    </label>
                    <input
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="experience"
                      placeholder="10"
                      type="number"
                      {...register('years_of_experience', { valueAsNumber: true })}
                    />
                    {errors.years_of_experience && <p className="text-xs" style={{color: "#dc2626"}}>{errors.years_of_experience.message}</p>}
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="bio">
                      Brief Bio
                    </label>
                    <textarea
                      className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                      id="bio"
                      placeholder="Describe your clinical focus and patient philosophy..."
                      rows={3}
                      {...register('bio')}
                    />
                    {errors.bio && <p className="text-xs" style={{color: "#dc2626"}}>{errors.bio.message}</p>}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                    Upload Medical License &amp; Credentials
                  </label>
                  <p className="text-xs text-on-surface-variant ml-1">
                    {medicalLicense ? `Selected: ${medicalLicense.name}` : "No file selected."}
                  </p>
                  <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-8 text-center hover:bg-surface-container-low transition-colors group">
                    <input 
                      className="hidden" 
                      id="file-upload" 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg" 
                      onChange={handleFileChange}
                    />
                    <label
                      className="cursor-pointer flex flex-col items-center"
                      htmlFor="file-upload"
                    >
                      <span className="material-symbols-outlined text-4xl text-outline mb-3 group-hover:text-primary transition-colors">
                        cloud_upload
                      </span>
                      <p className="font-bold text-on-surface">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        PDF, PNG or JPG (max. 10MB)
                      </p>
                    </label>
                  </div>
                  {medicalLicenseError && <p className="text-xs" style={{color: "#dc2626"}}>{medicalLicenseError}</p>}
                </div>
                <div className="pt-4">
                  <button
                    className="w-full py-4 bg-linear-to-r from-primary to-primary-container text-on-primary font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Apply to Join"}
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p className="text-center text-xs text-on-surface-variant mt-6">
                    By applying, you agree to our{" "}
                    <a className="text-primary font-semibold" href="#">
                      Verification Terms
                    </a>{" "}
                    and{" "}
                    <a className="text-primary font-semibold" href="#">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-slate-50 w-full border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
          <div className="text-xs text-slate-500 font-inter">
            © 2024 MedReserve Clinical Systems. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
              href="#"
            >
              Contact Support
            </a>
            <a
              className="text-xs text-slate-500 hover:text-slate-900 underline decoration-blue-500/30"
              href="#"
            >
              Healthcare Partners
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default RegisterDoctor;