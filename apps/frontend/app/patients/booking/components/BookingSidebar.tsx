import { DoctorDetailResponse } from '@/types';

type Props = {
  availability: DoctorDetailResponse['availability'];
};

export default function DoctorAvailability({ availability }: Props) {
    return (
            <div className="bg-surface-container-lowest p-8 rounded-4xl shadow-xl shadow-primary/5 border border-surface-container">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-headline font-extrabold text-on-surface">
                Book Appointment
                </h4>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            {/* Date Selection */}
            <div className="mb-8">
                <label className="block text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                Select Date
                </label>
                <div className="grid grid-cols-4 gap-2">
                <button className="flex flex-col items-center p-3 rounded-2xl bg-primary-container text-on-primary-container">
                    <span className="text-[10px] uppercase font-bold">Mon</span>
                    <span className="text-lg font-headline font-extrabold">
                    12
                    </span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Tue
                    </span>
                    <span className="text-lg font-headline font-extrabold">
                    13
                    </span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Wed
                    </span>
                    <span className="text-lg font-headline font-extrabold">
                    14
                    </span>
                </button>
                <button className="flex flex-col items-center p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">
                    Thu
                    </span>
                    <span className="text-lg font-headline font-extrabold">
                    15
                    </span>
                </button>
                </div>
            </div>
            {/* Time Slots */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                    Available Slots
                </label>
                <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    6 Slots Left
                </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                    09:00 AM
                </button>
                <button className="py-3 px-4 rounded-xl text-sm font-bold bg-surface-container-low text-on-surface-variant cursor-not-allowed line-through">
                    09:45 AM
                </button>
                <button className="py-3 px-4 rounded-xl text-sm font-bold border border-primary bg-primary/5 text-primary">
                    10:30 AM
                </button>
                <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                    11:15 AM
                </button>
                <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                    02:00 PM
                </button>
                <button className="py-3 px-4 rounded-xl text-sm font-bold border border-outline-variant/30 text-on-surface hover:bg-primary/5 hover:border-primary transition-all">
                    03:30 PM
                </button>
                </div>
            </div>
            {/* CTA */}
            <button className="w-full bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-2xl font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                Book Appointment
            </button>
            <p className="text-[10px] text-center text-on-surface-variant mt-4 px-6">
                By booking, you agree to our terms. You can cancel for free up to
                24h before the appointment.
            </p>
            </div>
    );
}