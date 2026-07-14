import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { bookSlot, getDoctorSlots, type DoctorSlot } from '@/services/bookingService';

type Props = {
    doctorId: string;
    doctorName?: string;
};

function formatDateLabel(dateKey: string) {
    const [year, month, day] = dateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    }).format(date);
}

function formatTime(time: string) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);
}

function statusLabel(slot: DoctorSlot) {
    if (slot.is_booked || slot.status === 'BOOKED') return 'Booked';
    if (slot.status === 'UNAVAILABLE') return 'Unavailable';
    return 'Available';
}

export default function BookingSidebar({ doctorId, doctorName }: Props) {
    const [slots, setSlots] = useState<DoctorSlot[]>([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(false);

    const loadSlots = async () => {
        if (!doctorId) return;

        setLoading(true);
        try {
            const data = await getDoctorSlots(doctorId);
            setSlots(data);
            setSelectedSlotId((current) => (current && data.some((slot) => slot.id === current) ? current : null));
            if (!selectedDate && data.length) {
                setSelectedDate(data[0].date);
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed to load slots');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSlots();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doctorId]);

    const dates = useMemo(
        () => Array.from(new Set(slots.map((slot) => slot.date))).sort(),
        [slots],
    );

    useEffect(() => {
        if (!selectedDate && dates.length) {
            setSelectedDate(dates[0]);
            return;
        }

        if (selectedDate && !dates.includes(selectedDate) && dates.length) {
            setSelectedDate(dates[0]);
        }
    }, [dates, selectedDate]);

    const selectedSlots = useMemo(
        () => slots.filter((slot) => slot.date === selectedDate),
        [slots, selectedDate],
    );

    const availableSlots = selectedSlots.filter(
        (slot) => !slot.is_booked && slot.status === 'AVAILABLE',
    );

    const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) ?? null;

    const handleBook = async () => {
        if (!selectedSlot) {
            toast.error('Select a slot first');
            return;
        }

        setBooking(true);
        try {
            const result = await bookSlot(selectedSlot.id);
            if (!result.success) {
                throw new Error('Booking failed');
            }

            toast.success('Slot booked successfully');
            setSelectedSlotId(null);
            await loadSlots();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Booking failed');
        } finally {
            setBooking(false);
        }
    };

    return (
        <div className="bg-surface-container-lowest p-8 rounded-4xl shadow-xl shadow-primary/5 border border-surface-container space-y-8">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="text-xl font-headline font-extrabold text-on-surface">
                        Book Appointment
                    </h4>
                    <p className="text-sm text-on-surface-variant mt-1">
                        {doctorName ? `Choose a time with ${doctorName}` : 'Choose an available time slot'}
                    </p>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mt-2" />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                        Available Dates
                    </label>
                    <span className="text-[10px] font-medium text-on-surface-variant">
                        {slots.filter((slot) => !slot.is_booked && slot.status === 'AVAILABLE').length} open slots
                    </span>
                </div>

                {loading ? (
                    <div className="rounded-2xl border border-dashed border-outline-variant/40 p-6 text-center text-sm text-on-surface-variant">
                        Loading slots...
                    </div>
                ) : dates.length ? (
                    <div className="grid grid-cols-2 gap-2">
                        {dates.map((date) => {
                            const isSelected = selectedDate === date;
                            const dateSlots = slots.filter((slot) => slot.date === date);
                            const openCount = dateSlots.filter((slot) => !slot.is_booked && slot.status === 'AVAILABLE').length;

                            return (
                                <button
                                    key={date}
                                    type="button"
                                    onClick={() => {
                                        setSelectedDate(date);
                                        setSelectedSlotId(null);
                                    }}
                                    className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                                        isSelected
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-outline-variant/30 bg-surface-container-low text-on-surface hover:border-primary/40'
                                    }`}
                                >
                                    <div className="text-sm font-bold">{formatDateLabel(date)}</div>
                                    <div className="text-[11px] text-on-surface-variant mt-1">
                                        {openCount} available
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-outline-variant/40 p-6 text-center text-sm text-on-surface-variant">
                        No slots found for this doctor yet.
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-label font-bold uppercase tracking-widest text-on-surface-variant">
                        Time Slots
                    </label>
                    <span className="text-[10px] font-medium text-on-surface-variant">
                        {availableSlots.length} open today
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {selectedSlots.map((slot) => {
                        const isBooked = slot.is_booked || slot.status === 'BOOKED';
                        const isSelected = selectedSlotId === slot.id;

                        return (
                            <button
                                key={slot.id}
                                type="button"
                                disabled={isBooked}
                                onClick={() => setSelectedSlotId(slot.id)}
                                className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                                    isBooked
                                        ? 'cursor-not-allowed border-outline-variant/20 bg-surface-container-low text-on-surface-variant line-through opacity-70'
                                        : isSelected
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-outline-variant/30 text-on-surface hover:border-primary hover:bg-primary/5'
                                }`}
                            >
                                <div>{formatTime(slot.start_time)}</div>
                                <div className="mt-1 text-[10px] font-medium uppercase tracking-wider opacity-70">
                                    {statusLabel(slot)}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="rounded-3xl bg-surface-container-low p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">Selected slot</span>
                    <span className="font-semibold text-on-surface">
                        {selectedSlot ? formatDateLabel(selectedSlot.date) : 'None'}
                    </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-on-surface-variant">Time</span>
                    <span className="font-semibold text-on-surface">
                        {selectedSlot ? `${formatTime(selectedSlot.start_time)} - ${formatTime(selectedSlot.end_time)}` : '--'}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={handleBook}
                disabled={booking || !selectedSlot || selectedSlot.is_booked || selectedSlot.status !== 'AVAILABLE'}
                className="w-full bg-linear-to-r from-primary to-primary-container text-on-primary py-4 rounded-2xl font-headline font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {booking ? 'Booking...' : 'Book Appointment'}
            </button>

            <p className="text-[10px] text-center text-on-surface-variant px-6">
                By booking, you reserve one available slot. You can book only open slots.
            </p>
        </div>
    );
}