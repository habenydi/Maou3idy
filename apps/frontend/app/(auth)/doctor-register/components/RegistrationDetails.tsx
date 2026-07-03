'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

type RegisterDoctorForm = {
  name: string;
  email: string;
  password: string;
  speciality: string;
  license_number: string;
  years_of_experience: number;
  bio: string;
  phone: string;
};

interface Props {
  register: UseFormRegister<RegisterDoctorForm>;
  errors: FieldErrors<RegisterDoctorForm>;
}

function RegistrationDetailsSection({
  register,
  errors,
}: Props) {
  return (
    <>
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
          <label
            className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
            htmlFor="name"
          >
            Full Name
          </label>

          <input
            className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            id="name"
            placeholder="Dr. Jane Smith"
            type="text"
            {...register('name')}
          />

          {errors.name && (
            <p
              className="text-xs"
              style={{ color: '#dc2626' }}
            >
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
            htmlFor="email"
          >
            Professional Email
          </label>

          <input
            className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            id="email"
            placeholder="jane.smith@clinic.com"
            {...register('email')}
          />

          {errors.email && (
            <p
              className="text-xs"
              style={{ color: '#dc2626' }}
            >
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
            htmlFor="password"
          >
            Password
          </label>

          <input
            className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            id="password"
            type="password"
            {...register('password')}
          />

          {errors.password && (
            <p
              className="text-xs"
              style={{ color: '#dc2626' }}
            >
              {String(errors.password.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
            htmlFor="phone"
          >
            Phone
          </label>

          <input
            className="w-full bg-surface-container-low border-0 rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all"
            id="phone"
            placeholder="+212 6123-45678"
            type="tel"
            {...register('phone')}
          />

          {errors.phone && (
            <p
              className="text-xs"
              style={{ color: '#dc2626' }}
            >
              {String(errors.phone.message)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
            htmlFor="speciality"
          >
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

          {errors.speciality && (
            <p
              className="text-xs"
              style={{ color: '#dc2626' }}
            >
              {String(errors.speciality.message)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default RegistrationDetailsSection;