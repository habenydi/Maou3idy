"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar";
import InformationFooter from "@/components/InformationFooter";
import { useAuth } from "@/app/layout";
import {
  cancelMyBookingApi,
  fetchMyBookingsApi,
  type UserBooking,
} from "@/lib/api";

const STATUS_FILTERS = ["ALL", "BOOKED", "COMPLETED", "CANCELLED"] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];

function formatDate(value: string) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function statusBadgeConfig(status: UserBooking["status"]) {
  switch (status) {
    case "BOOKED":
      return {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
        dot: "bg-emerald-500",
        label: "Confirmed",
      };
    case "COMPLETED":
      return {
        bg: "bg-sky-50 text-sky-700 border-sky-200/60",
        dot: "bg-sky-500",
        label: "Completed",
      };
    case "CANCELLED":
      return {
        bg: "bg-rose-50 text-rose-700 border-rose-200/60",
        dot: "bg-rose-500",
        label: "Cancelled",
      };
    default:
      return {
        bg: "bg-slate-100 text-slate-700 border-slate-200",
        dot: "bg-slate-400",
        label: status,
      };
  }
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [filter, setFilter] = useState<StatusFilter>("ALL");
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const loadBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyBookingsApi();
        setBookings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    void loadBookings();
  }, [authLoading, router, user]);

  const visibleBookings = useMemo(() => {
    if (filter === "ALL") return bookings;
    return bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  const upcomingCount = bookings.filter((b) => b.status === "BOOKED").length;
  const completedCount = bookings.filter((b) => b.status === "COMPLETED").length;
  const cancelledCount = bookings.filter((b) => b.status === "CANCELLED").length;

  const handleCancel = async (booking: UserBooking) => {
    try {
      setCancelingId(booking.id);
      await cancelMyBookingApi(booking.id);
      setBookings((current) =>
        current.map((item) =>
          item.id === booking.id ? { ...item, status: "CANCELLED" } : item
        )
      );
      toast.success("Appointment successfully cancelled");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to cancel booking");
    } finally {
      setCancelingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900/2 text-slate-900 selection:bg-primary/20 selection:text-primary">
      <Navbar activeLink="dashboard" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-20 space-y-8">
        {/* Professional Header Section */}
        <section className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                <span className="material-symbols-outlined text-sm">event_note</span>
                Patient Portal
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                My Appointments
              </h1>
              <p className="text-slate-500 text-sm max-w-xl">
                Track your active consultations, review medical service histories, and manage scheduled clinic visits.
              </p>
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Upcoming", value: upcomingCount, color: "text-emerald-600" },
                { label: "Completed", value: completedCount, color: "text-sky-600" },
                { label: "Cancelled", value: cancelledCount, color: "text-rose-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center min-w-22"
                >
                  <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {STATUS_FILTERS.map((status) => {
              const active = filter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    active
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {status === "ALL" ? "All Appointments" : status.charAt(0) + status.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-3.5 text-rose-700 text-sm flex items-center gap-3">
            <span className="material-symbols-outlined text-rose-500">error</span>
            {error}
          </div>
        )}

        {/* Content View */}
        {loading ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 font-medium text-sm">Loading your appointments...</p>
          </div>
        ) : visibleBookings.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-3xl p-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
              <span className="material-symbols-outlined text-2xl">calendar_today</span>
            </div>
            <p className="text-lg font-bold text-slate-900">No appointments found</p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              You don&apos;t have any appointments matching this filter category right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {visibleBookings.map((booking) => {
              const doctorName = booking.doctor?.user?.name || "Medical Professional";
              const serviceName = booking.service?.name || "Consultation Service";
              const badge = statusBadgeConfig(booking.status);

              return (
                <article
                  key={booking.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      {/* Top Info line */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Ref: #{booking.id.slice(0, 8)}
                          </span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                          {badge.label}
                        </div>
                      </div>

                      {/* Doctor & Service Details */}
                      <div>
                        <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                          Dr. {doctorName}
                        </h2>
                        <p className="text-slate-600 font-medium text-sm mt-0.5">
                          {serviceName}
                        </p>
                        {booking.service?.description && (
                          <p className="text-slate-500 text-xs mt-1.5 line-clamp-1 max-w-2xl">
                            {booking.service.description}
                          </p>
                        )}
                      </div>

                      {/* Meta attributes */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-slate-400 text-base">calendar_today</span>
                          <span>{formatDate(booking.date)}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
                          <span>{formatTime(booking.start_time)} - {formatTime(booking.end_time)}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span className="material-symbols-outlined text-slate-400 text-base">payments</span>
                          <span>${booking.service?.price ?? 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      {booking.status === "BOOKED" && (
                        <button
                          type="button"
                          onClick={() => handleCancel(booking)}
                          disabled={cancelingId === booking.id}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-base">cancel</span>
                          {cancelingId === booking.id ? "Cancelling..." : "Cancel Appointment"}
                        </button>
                      )}
                      {booking.doctor?.id && (
                        <button
                          type="button"
                          onClick={() => router.push(`/booking?doctorId=${booking.doctor?.id}`)}
                          className="flex-1 lg:flex-none px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-base">refresh</span>
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <InformationFooter />
    </div>
  );
}