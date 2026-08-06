'use client';

import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Country, State, City } from 'country-state-city';

type location = {
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

type RegisterDoctorForm = {
  name: string;
  email: string;
  phone: string;
  speciality: string;
  languages: string[];
  license_number: string;
  experience: number;
  bio: string;
  location: location;
};

interface Props {
  register: UseFormRegister<RegisterDoctorForm>;
  setValue: UseFormSetValue<RegisterDoctorForm>;
  errors: FieldErrors<RegisterDoctorForm>;
}

const selectClass = 'w-full bg-surface-container-low rounded-xl px-4 py-3 border-0 focus:ring-2 focus:ring-primary/20 transition-all';
const labelClass = 'text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1';

function RegistrationDetailsSection({ register, setValue, errors }: Props) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [selectedStateCode, setSelectedStateCode] = useState('');

  const countries = Country.getAllCountries();
  const states = selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : [];
  const cities = selectedCountryCode && selectedStateCode
    ? City.getCitiesOfState(selectedCountryCode, selectedStateCode)
    : [];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const name = Country.getCountryByCode(code)?.name ?? '';
    setSelectedCountryCode(code);
    setSelectedStateCode('');
    setValue('location.country', name);
    setValue('location.state', '');
    setValue('location.city', '');
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const name = State.getStateByCodeAndCountry(code, selectedCountryCode)?.name ?? '';
    setSelectedStateCode(code);
    setValue('location.state', name);
    setValue('location.city', '');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue('location.city', e.target.value);
  };

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
          <label className={labelClass} htmlFor="name">Full Name</label>
          <input
            className={selectClass}
            id="name"
            placeholder="Dr. Jane Smith"
            {...register('name')}
          />
          {errors.name && <p className="text-xs text-red-600">{String(errors.name.message)}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="email">Professional Email</label>
          <input
            className={selectClass}
            id="email"
            placeholder="doctor@clinic.com"
            {...register('email')}
          />
          {errors.email && <p className="text-xs text-red-600">{String(errors.email.message)}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="phone">Phone Number</label>
          <input
            className={selectClass}
            id="phone"
            placeholder="+212 600 000 000"
            {...register('phone')}
          />
          {errors.phone && <p className="text-xs text-red-600">{String(errors.phone.message)}</p>}
        </div>

        {/* Location heading */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-bold uppercase text-on-surface-variant mb-4">
            Clinic Location
          </h3>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="country">Country</label>
          <select
            id="country"
            className={selectClass}
            value={selectedCountryCode}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
          {errors.location?.country && (
            <p className="text-xs text-red-600">{String(errors.location.country.message)}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="state">State / Region</label>
          <select
            id="state"
            className={selectClass}
            value={selectedStateCode}
            onChange={handleStateChange}
            disabled={!selectedCountryCode}
          >
            <option value="">
              {selectedCountryCode ? 'Select State' : 'Select a country first'}
            </option>
            {states.map((s) => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.location?.state && (
            <p className="text-xs text-red-600">{String(errors.location.state.message)}</p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="city">City</label>
          <select
            id="city"
            className={selectClass}
            onChange={handleCityChange}
            disabled={!selectedStateCode}
          >
            <option value="">
              {selectedStateCode ? 'Select City' : 'Select a state first'}
            </option>
            {cities.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.location?.city && (
            <p className="text-xs text-red-600">{String(errors.location.city.message)}</p>
          )}
        </div>

        {/* Zip Code */}
        <div className="space-y-2">
          <label className={labelClass} htmlFor="zip_code">Zip Code</label>
          <input
            id="zip_code"
            placeholder="20000"
            className={selectClass}
            {...register('location.zip_code')}
          />
          {errors.location?.zip_code && (
            <p className="text-xs text-red-600">{String(errors.location.zip_code.message)}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-2 md:col-span-2">
          <label className={labelClass} htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="123 Boulevard Zerktouni"
            className={selectClass}
            {...register('location.address')}
          />
          {errors.location?.address && (
            <p className="text-xs text-red-600">{String(errors.location.address.message)}</p>
          )}
        </div>

        {/* Specialty */}
        <div className="space-y-2 md:col-span-2">
          <label className={labelClass} htmlFor="speciality">Specialty</label>
          <select className={selectClass} id="speciality" {...register('speciality')}>
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
            <p className="text-xs text-red-600">{String(errors.speciality.message)}</p>
          )}
        </div>

        {/* Languages */}
        <div className="md:col-span-2">
          <label className="text-xs font-bold text-on-surface-variant tracking-wider uppercase ml-1 block mb-3">
            Languages Spoken
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Arabic', 'French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Tamazight'].map((language) => (
              <label
                key={language}
                className="flex items-center gap-2 bg-surface-container-low px-4 py-3 rounded-xl cursor-pointer hover:bg-surface-container transition-all"
              >
                <input
                  type="checkbox"
                  value={language}
                  {...register('languages')}
                  className="accent-primary"
                />
                <span className="text-sm">{language}</span>
              </label>
            ))}
          </div>
          {errors.languages && (
            <p className="text-xs text-red-600 mt-2">{String(errors.languages.message)}</p>
          )}
        </div>

      </div>
    </>
  );
}

export default RegistrationDetailsSection;
