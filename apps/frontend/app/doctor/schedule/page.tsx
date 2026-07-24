"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import DoctorShell from "../components/DoctorShell";
import { apiFetch } from "@/lib/api";
import "./schedule.css";
import { useAuth } from "../../layout";

function toLocalDateStr(date: Date): string {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

type SlotStatus = "available" | "unavailable" | "booked";

type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  backgroundColor: string;
  editable?: boolean;
  extendedProps?: {
    status: SlotStatus;
    isBooked: boolean;
  };
};

type Slot = {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  status: string;
};

const DEFAULT_SETTINGS = {
  duration: 30,
  buffer: 5,
  start_date: toLocalDateStr(new Date()),
  numberOfDays: 3,
  startHour: "09:00",
  endHour: "09:30",
};

const SLOT_COLORS: Record<SlotStatus, string> = {
  available: "#10b981",
  unavailable: "#9ca3af",
  booked: "#0057cd",
};

function slotToEvent(slot: Slot): CalendarEvent {
  const dateStr = toLocalDateStr(new Date(slot.date));

  const status: SlotStatus = slot.is_booked
    ? "booked"
    : slot.status?.toUpperCase() === "AVAILABLE"
      ? "available"
      : "unavailable";

  return {
    id: String(slot.id),
    title:
      status === "booked"
        ? "Booked"
        : status === "available"
          ? "Available"
          : "Unavailable",
    start: new Date(`${dateStr}T${slot.start_time}`),
    end: new Date(`${dateStr}T${slot.end_time}`),
    backgroundColor: SLOT_COLORS[status],
    editable: status === "available",
    extendedProps: { status, isBooked: slot.is_booked },
  };
}

const Schedule = () => {
  const auth = useAuth() as {
    user: { role?: string; doctor?: { id?: string | number } } | null;
    loading: boolean;
  };
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const canManageSlots = auth?.user?.role === "DOCTOR";

  const stats = useMemo(() => {
    const available = events.filter(
      (e) => e.extendedProps?.status === "available",
    ).length;
    const booked = events.filter(
      (e) => e.extendedProps?.status === "booked",
    ).length;
    const unavailable = events.length - available - booked;
    return { available, booked, unavailable, total: events.length };
  }, [events]);

  // ─── Fetch all slots ──────────────────────────────────────────────────────
  const fetchSlots = useCallback(async () => {
    if (!canManageSlots) {
      setEvents([]);
      return;
    }

    try {
      setError(null);
      const res = await apiFetch("/slots/me");
      if (!res.ok) throw new Error("Could not load slots from server");
      const data: Slot[] = await res.json();
      setEvents(data.map(slotToEvent));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load slots";
      setError(msg);
    }
  }, [canManageSlots]);

  useEffect(() => {
    void (async () => {
      await fetchSlots();
    })();
  }, [fetchSlots]);

  // ─── Generate slots ───────────────────────────────────────────────────────
  const handleGenerateSlots = async () => {
    if (!canManageSlots) {
      toast.error("You need a doctor profile before generating slots");
      return;
    }

    if (settings.startHour >= settings.endHour) {
      toast.error("End time must be after start time");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/slots/generate", {
        method: "POST",
        body: JSON.stringify({
          start_date: settings.start_date,
          number_of_days: settings.numberOfDays,
          start_hour: settings.startHour,
          end_hour: settings.endHour,
          duration: settings.duration,
          buffer_time: settings.buffer,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? `Server error (${res.status})`);
      }

      await fetchSlots();
      toast.success("Slots generated and saved");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      toast.error(`Failed to generate slots: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // ─── Delete a single slot ─────────────────────────────────────────────────
  const deleteEvent = async (eventId: string) => {
    if (!canManageSlots) {
      toast.error("You need a doctor profile before managing slots");
      return;
    }

    const event = events.find((e) => e.id === eventId);
    if (event?.extendedProps?.isBooked) {
      toast.warning("Booked slots cannot be deleted");
      return;
    }

    try {
      const res = await apiFetch(`/slots/${eventId}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message ?? "Delete failed");
      }
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      toast.success("Slot removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // ─── Drag-to-reschedule ───────────────────────────────────────────────────
  const handleEventDrop = async (info: {
    event: { id: string; start: Date | null; end: Date | null };
    revert: () => void;
  }) => {
    if (!canManageSlots) {
      toast.error("You need a doctor profile before managing slots");
      info.revert();
      return;
    }

    if (!info.event.start || info.event.start < new Date()) {
      toast.error("Cannot move slots to the past");
      info.revert();
      return;
    }

    try {
      const res = await apiFetch(`/slots/${info.event.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          date: toLocalDateStr(info.event.start),
          start_time: info.event.start.toTimeString().slice(0, 5),
          end_time: info.event.end!.toTimeString().slice(0, 5),
        }),
      });
      if (!res.ok) throw new Error("Update failed");

      setEvents((prev) =>
        prev.map((e) =>
          e.id === info.event.id
            ? { ...e, start: info.event.start!, end: info.event.end! }
            : e,
        ),
      );
    } catch {
      toast.error("Failed to move slot — reverting");
      info.revert();
    }
  };

  // ─── Resize slot ──────────────────────────────────────────────────────────
  const handleEventResize = async (info: {
    event: { id: string; start: Date | null; end: Date | null };
    revert: () => void;
  }) => {
    if (!canManageSlots) {
      toast.error("You need a doctor profile before managing slots");
      info.revert();
      return;
    }

    if (!info.event.start || info.event.start < new Date()) {
      toast.error("Cannot resize into the past");
      info.revert();
      return;
    }

    try {
      const res = await apiFetch(`/slots/${info.event.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          date: toLocalDateStr(info.event.start),
          start_time: info.event.start.toTimeString().slice(0, 5),
          end_time: info.event.end!.toTimeString().slice(0, 5),
        }),
      });
      if (!res.ok) throw new Error("Update failed");

      setEvents((prev) =>
        prev.map((e) =>
          e.id === info.event.id
            ? { ...e, start: info.event.start!, end: info.event.end! }
            : e,
        ),
      );
    } catch {
      toast.error("Failed to resize slot — reverting");
      info.revert();
    }
  };

  // ─── Clear all slots ──────────────────────────────────────────────────────
  const handleClearAll = async () => {
    if (!canManageSlots) {
      toast.error("Doctor profile is required");
      return;
    }

    if (!confirm("Clear all non-booked slots?")) return;

    try {
      const res = await apiFetch(`/slots/me`, { method: "DELETE" });
      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body.message ?? "Clear failed");
      }

      await fetchSlots();

      if (body.deleted === 0) {
        toast.warning("No slots were cleared");
      } else {
        toast.info(`Cleared ${body.deleted ?? ""} slot(s)`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Clear failed");
    }
  };

  const inputClass =
    "w-full bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-4 py-3 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow";

  return (
    <DoctorShell>
      <main className="flex-1 bg-surface min-h-screen overflow-y-auto">
        {/* Header */}
        <header className="px-8 pt-10 pb-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">
              Schedule
            </h1>
            <p className="text-on-surface-variant font-medium">
              Configure availability and manage appointment slots.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Available",
                value: stats.available,
                icon: "event_available",
                color: "text-emerald-600",
                bg: "bg-emerald-500/10",
              },
              {
                label: "Booked",
                value: stats.booked,
                icon: "event_busy",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                label: "Total",
                value: stats.total,
                icon: "calendar_month",
                color: "text-on-surface-variant",
                bg: "bg-surface-container",
              },
            ].map(({ label, value, icon, color, bg }) => (
              <div
                key={label}
                className="bg-surface-container-lowest px-5 py-3 rounded-xl flex items-center gap-3 min-w-32.5"
              >
                <div
                  className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center ${color}`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {icon}
                  </span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider">
                    {label}
                  </p>
                  <p className="text-xl font-black text-on-surface">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </header>

        <section className="px-8 pb-12">
          {error && (
            <div className="mb-6 flex items-center gap-3 bg-error-container/30 border border-error/20 text-error px-4 py-3 rounded-xl text-sm">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Settings panel */}
            <div className="xl:col-span-4 space-y-4">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSettingsOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      tune
                    </span>
                    <h2 className="text-lg font-bold text-on-surface">
                      Slot Settings
                    </h2>
                  </div>
                  <span className="material-symbols-outlined text-outline">
                    {settingsOpen ? "expand_less" : "expand_more"}
                  </span>
                </button>

                {settingsOpen && (
                  <div className="px-6 pb-6 space-y-4 border-t border-outline-variant/20">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2 pt-3">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={settings.start_date}
                        min={toLocalDateStr(new Date())}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            start_date: e.target.value,
                          })
                        }
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                        Days Ahead
                      </label>
                      <select
                        value={settings.numberOfDays}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            numberOfDays: parseInt(e.target.value, 10) || 1,
                          })
                        }
                        className={inputClass}
                      >
                        {[3, 5, 7, 14, 21, 30].map((d) => (
                          <option key={d} value={d}>
                            {d} days
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                          Duration
                        </label>
                        <select
                          value={settings.duration}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              duration: parseInt(e.target.value, 10),
                            })
                          }
                          className={inputClass}
                        >
                          <option value={15}>15 min</option>
                          <option value={30}>30 min</option>
                          <option value={45}>45 min</option>
                          <option value={60}>1 hour</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                          Buffer
                        </label>
                        <select
                          value={settings.buffer}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              buffer: parseInt(e.target.value, 10),
                            })
                          }
                          className={inputClass}
                        >
                          <option value={0}>None</option>
                          <option value={5}>5 min</option>
                          <option value={10}>10 min</option>
                          <option value={15}>15 min</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={settings.startHour}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              startHour: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={settings.endHour}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              endHour: e.target.value,
                            })
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <button
                        type="button"
                        onClick={handleGenerateSlots}
                        disabled={loading || !canManageSlots}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary-container transition-colors disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {loading ? "hourglass_top" : "auto_fix_high"}
                        </span>
                        {loading ? "Generating…" : "Generate Slots"}
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setSettings(DEFAULT_SETTINGS)}
                          className="px-4 py-2.5 text-sm font-semibold text-on-surface-variant bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors"
                        >
                          Reset
                        </button>
                        <button
                          type="button"
                          onClick={handleClearAll}
                          disabled={!canManageSlots}
                          className="px-4 py-2.5 text-sm font-semibold text-error bg-error-container/30 rounded-xl hover:bg-error-container/50 transition-colors"
                        >
                          Clear All
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={fetchSlots}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          refresh
                        </span>
                        Refresh from server
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-5">
                <h3 className="text-sm font-bold text-on-surface mb-3">
                  Legend
                </h3>
                <div className="space-y-2">
                  {(
                    [
                      ["available", "Available"],
                      ["unavailable", "Unavailable (past)"],
                      ["booked", "Booked"],
                    ] as const
                  ).map(([key, label]) => (
                    <div
                      key={key}
                      className="flex items-center gap-2.5 text-sm text-on-surface-variant"
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: SLOT_COLORS[key] }}
                      />
                      {label}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-outline leading-relaxed">
                  Click an available slot to remove it. Drag to reschedule open
                  slots.
                </p>
              </div>
            </div>

            {/* Calendar */}
            <div className="xl:col-span-8">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
                <div className="px-6 py-4 border-b border-outline-variant/20 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">
                    calendar_month
                  </span>
                  <h2 className="text-lg font-bold text-on-surface">
                    Calendar View
                  </h2>
                </div>
                <div className="p-4 md:p-6 schedule-calendar">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    height="auto"
                    editable
                    nowIndicator
                    slotMinTime="07:00:00"
                    slotMaxTime="21:00:00"
                    weekends
                    events={events}
                    eventClick={(info) => {
                      if (info.event.extendedProps?.isBooked) {
                        toast.info("This slot is already booked");
                        return;
                      }
                      if (
                        confirm(
                          `Remove "${info.event.title}" on ${info.event.start?.toLocaleDateString()}?`,
                        )
                      ) {
                        deleteEvent(info.event.id);
                      }
                    }}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    eventContent={(info) => (
                      <div className="px-1 py-0.5 text-xs font-semibold leading-tight">
                        <div className="truncate">{info.event.title}</div>
                        <div className="text-[10px] opacity-80">
                          {info.timeText}
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DoctorShell>
  );
};

export default Schedule;
