'use client';

import Img from "next/image";
import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";

function RegisterDoctor() {
  const [isLoading, setIsLoading] = useState(false);
  const [medical_license, setMedicalLicense] = useState<File | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    license_number: "",
    years_of_experience: 0,
    bio: "",
    medical_license: "",
    phone: "",
  });
  const registerSchema = z.object({
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
    speciality: z.string().min(1, "speciality is required"),
    license_number: z.string().min(1, "License number is required"),
    years_of_experience: z.number().min(0, "Years of experience must be a positive number"),
    bio: z.string().min(1, "Brief bio is required"),
    medical_license: z.string().min(1, "Medical license is required"),
    phone: z.string().min(1, "Phone number is required"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMedicalLicense(file);

    setFormData((prev) => ({
      ...prev,
      medical_license: file.name,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!medical_license) {
        toast.error("Medical license is required");
        setIsLoading(false);
        return;
      }
      const parseResult = registerSchema.safeParse(formData);
      if (!parseResult.success) {
        const message = parseResult.error.issues[0]?.message || "Invalid input";
        toast.error(message);
        setIsLoading(false);
        return;
      }

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("speciality", formData.speciality);
      payload.append("license_number", formData.license_number);
      payload.append("years_of_experience", String(formData.years_of_experience));
      payload.append("bio", formData.bio);
      payload.append("phone", formData.phone);
      payload.append("medical_license", medical_license);

			const { data } = await axios.post(
				"http://127.0.0.1:1337/auth/doctor-register",
        payload,
				{
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
					},
				}
			);

      toast.success(data.message || "Registration successful! Please check your email to verify your account.");
      setIsLoading(false);
      setMedicalLicense(null);
      setFormData({
        email: "",
        password: "",
        name: "",
        speciality: "",
        license_number: "",
        years_of_experience: 0,
        bio: "",
        medical_license: "",
        phone: "",
      });
      router.push("/doctor/dashboard");
    } catch (error) {
      const message =
      axios.isAxiosError(error)
        ? error.response?.data?.message ||
          "Request failed"
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred";
      console.error("Registration error:", formData, error);
      toast.error(message);
      setIsLoading(false);
      return;
    }
  };
  return (
    <>
  <meta charSet="utf-8" />
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />
  <title>Join MedReserve | Professional Registration</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body { font-family: 'Inter', sans-serif; }\n        h1, h2, h3 { font-family: 'Manrope', sans-serif; }\n        .material-symbols-outlined {\n            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;\n        }\n        .glass-panel {\n            background: rgba(255, 255, 255, 0.7);\n            backdrop-filter: blur(12px);\n        }\n    "
    }}
  />
  <nav className="fixed top-0 w-full z-50 bg-slate-50/80 backdrop-blur-xl shadow-sm">
    <div className="flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto">
      <div className="text-xl font-bold tracking-tighter text-slate-900 font-manrope">
        MedReserve
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          Find Doctors
        </a>
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          Specialties
        </a>
        <a
          className="text-slate-600 font-manrope tracking-tight font-semibold hover:text-blue-700 transition-colors"
          href="#"
        >
          About Us
        </a>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-600 font-manrope tracking-tight font-semibold px-4 py-2 active:scale-95 duration-200">
          Sign In
        </button>
        <button className="bg-primary text-on-primary font-manrope tracking-tight font-semibold px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-container shadow-md active:scale-95 duration-200">
          Join as Doctor
        </button>
      </div>
    </div>
    <div className="bg-slate-200/50 h-px" />
  </nav>
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
          <form className="space-y-10" onSubmit={handleSubmit}>
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
                  name="name"
                  placeholder="Dr. Jane Smith"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="email">
                  Professional Email
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  id="email"
                  name="email"
                  placeholder="jane.smith@clinic.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  id="phone"
                  name="phone"
                  placeholder="+212 6123-45678"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="speciality">
                  Specialty
                </label>
                <select
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all appearance-none"
                  id="speciality"
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
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
                  name="license_number"
                  placeholder="MD-XXXX-XXXX"
                  type="text"
                  value={formData.license_number}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="experience">
                  Years of Experience
                </label>
                <input
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  id="experience"
                  name="years_of_experience"
                  placeholder={"10"}
                  type="number"
                  value={formData.years_of_experience}
                  onChange={handleNumberChange}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1" htmlFor="bio">
                  Brief Bio
                </label>
                <textarea
                  className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
                  id="bio"
                  name="bio"
                  placeholder="Describe your clinical focus and patient philosophy..."
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1">
                Upload Medical License &amp; Credentials
              </label>
              <p className="text-xs text-on-surface-variant ml-1">
                Required before submitting. {formData.medical_license ? `Selected: ${formData.medical_license}` : "No file selected."}
              </p>
              <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-8 text-center hover:bg-surface-container-low transition-colors group">
                <input className="hidden" id="file-upload" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileChange} />
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
            </div>
            <div className="pt-4">
              <button
                className="w-full py-4 bg-linear-to-r from-primary to-primary-container text-on-primary font-bold text-lg rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                type="submit"
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
