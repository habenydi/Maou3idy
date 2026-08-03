'use client';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

type RegisterDoctorForm = {
  name: string;
  email: string;
  location: string;
  languages: string[];
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
      {/* Full Name */}
      <div className="space-y-2">
        <label
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
          htmlFor="name"
        >
          Full Name
        </label>

        <input
          className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          id="name"
          placeholder="Dr. Jane Smith"
          {...register('name')}
        />

        {errors.name && (
          <p className="text-xs text-red-600">
            {String(errors.name.message)}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
          htmlFor="email"
        >
          Professional Email
        </label>

        <input
          className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          id="email"
          placeholder="doctor@clinic.com"
          {...register('email')}
        />

        {errors.email && (
          <p className="text-xs text-red-600">
            {String(errors.email.message)}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
          htmlFor="phone"
        >
          Phone Number
        </label>

        <input
          className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          id="phone"
          placeholder="+212 600 000 000"
          {...register('phone')}
        />

        {errors.phone && (
          <p className="text-xs text-red-600">
            {String(errors.phone.message)}
          </p>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
          htmlFor="location"
        >
          Location
        </label>

        <input
          className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          id="location"
          placeholder="Casablanca, Morocco"
          {...register('location')}
        />

        {errors.location && (
          <p className="text-xs text-red-600">
            {String(errors.location.message)}
          </p>
        )}
      </div>

      {/* Specialty */}
      <div className="space-y-2 md:col-span-2">
        <label
          className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1"
          htmlFor="speciality"
        >
          Specialty
        </label>

        <select
          className="w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all"
          id="speciality"
          {...register('speciality')}
        >
          <option value="">Select Specialty</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Psychiatry">Psychiatry</option>
          <option value="General Medicine">General Medicine</option>
        </select>

        {errors.speciality && (
          <p className="text-xs text-red-600">
            {String(errors.speciality.message)}
          </p>
        )}
      </div>

      {/* Languages */}
      <div className="md:col-span-2">
        <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1 block mb-3">
          Languages Spoken
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'Arabic',
            'French',
            'English',
            'Spanish',
            'German',
            'Italian',
            'Portuguese',
            'Tamazight',
          ].map((language) => (
            <label
              key={language}
              className="
                flex items-center gap-2
                bg-surface-container-low
                px-4 py-3
                rounded-xl
                cursor-pointer
                hover:bg-surface-container
                transition-all
              "
            >
              <input
                type="checkbox"
                value={language}
                {...register('languages')}
                className="accent-primary"
              />

              <span className="text-sm">
                {language}
              </span>
            </label>
          ))}
        </div>

        {errors.languages && (
          <p className="text-xs text-red-600 mt-2">
            {String(errors.languages.message)}
          </p>
        )}
      </div>
    </div>
    </>
  );
}

export default RegistrationDetailsSection;