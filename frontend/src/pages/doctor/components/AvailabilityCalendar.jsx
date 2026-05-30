import {
    createAvailability,
    getDoctorAvailability,
    deleteAvailability
} from '../../../services/availabilityService';

import { getDoctorAppointments } from '../../../services/appointmentService';

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { useState, useEffect } from 'react';

const AvailabilityCalendar = ({ doctorId }) => {

    // ---------------- STATES ----------------
    const [availabilities, setAvailabilities] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [slotToDelete, setSlotToDelete] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ---------------- FETCH DATA ----------------
    const loadData = async () => {
        const [a, ap] = await Promise.all([
            getDoctorAvailability(doctorId),
            getDoctorAppointments(doctorId)
        ]);

        setAvailabilities(a);
        setAppointments(ap);
    };

    useEffect(() => {
        if (doctorId) loadData();
    }, [doctorId]);

    // ---------------- TIME HELPERS ----------------
    const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = modifier === 'AM' ? '00' : '12';
        } else if (modifier === 'PM') {
            hours = String(parseInt(hours, 10) + 12);
        }

        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const toISO = (date, time) => `${date}T${convertTo24Hour(time)}`;

    // ---------------- AVAILABLE (BLUE) ----------------
    const availabilityEvents = availabilities.map(s => ({
        id: s._id,
        title: "Available",
        start: toISO(s.date, s.startTime),
        end: toISO(s.date, s.endTime),
        backgroundColor: "#4E8098",
        borderColor: "#4E8098",
        extendedProps: { type: "available" }
    }));

    // ---------------- BOOKED (GRAY) ----------------
    const bookedEvents = appointments.map(a => ({
        id: `booked-${a._id}`,
        title: "Booked",
        start: `${a.appointmentDate}T${convertTo24Hour(a.startTime)}`,
        end: `${a.appointmentDate}T${convertTo24Hour(a.endTime || a.startTime)}`,
        backgroundColor: "#6B7280",
        borderColor: "#6B7280",
        extendedProps: { type: "booked" }
    }));

    // ---------------- SELECTED (RED) ----------------
    const selectedEvents = selectedSlots.map(s => ({
        id: s.key,
        title: "Selected",
        start: `${s.date}T${s.start}`,
        end: `${s.date}T${s.end}`,
        backgroundColor: "#A31621",
        borderColor: "#A31621",
        extendedProps: { type: "selected" }
    }));

    // ---------------- FINAL EVENTS ----------------
    const events = [
        ...availabilityEvents,
        ...bookedEvents,
        ...selectedEvents
    ];

    // ---------------- SLOT SELECTION ----------------
    const handleDateClick = (info) => {
        const date = info.dateStr.split('T')[0];
        const hour = new Date(info.date).getHours();

        const slotMap = {
            7: ["7:00 AM - 8:00 AM", "07:00:00", "08:00:00"],
            8: ["8:00 AM - 9:00 AM", "08:00:00", "09:00:00"],
            9: ["9:00 AM - 10:00 AM", "09:00:00", "10:00:00"],
            10: ["10:00 AM - 11:00 AM", "10:00:00", "11:00:00"],
            11: ["11:00 AM - 12:00 PM", "11:00:00", "12:00:00"],
            12: ["12:00 PM - 1:00 PM", "12:00:00", "13:00:00"],
            13: ["1:00 PM - 2:00 PM", "13:00:00", "14:00:00"],
            14: ["2:00 PM - 3:00 PM", "14:00:00", "15:00:00"],
            15: ["3:00 PM - 4:00 PM", "15:00:00", "16:00:00"],
            16: ["4:00 PM - 5:00 PM", "16:00:00", "17:00:00"],
            17: ["5:00 PM - 6:00 PM", "17:00:00", "18:00:00"],
        };

        const slot = slotMap[hour];
        if (!slot) return;

        const [label, start, end] = slot;
        const key = `${date}_${label}`;

        const exists = selectedSlots.find(s => s.key === key);

        if (exists) {
            setSelectedSlots(prev =>
                prev.filter(s => s.key !== key)
            );
        } else {
            setSelectedSlots(prev => [
                ...prev,
                { key, date, start, end }
            ]);
        }
    };

    // ---------------- DELETE AVAILABILITY ----------------
    const handleEventClick = (info) => {
        const type = info.event.extendedProps.type;

        if (type !== "available") return;

        setSlotToDelete(info.event.id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        await deleteAvailability(slotToDelete);
        setShowDeleteModal(false);
        setSlotToDelete(null);
        loadData();
    };

    // ---------------- SAVE AVAILABILITY ----------------
    const handleSave = async () => {
        setLoading(true);

        try {
            for (const s of selectedSlots) {
                await createAvailability({
                    doctor: doctorId,
                    date: s.date,
                    startTime: s.start,
                    endTime: s.end,
                });
            }

            setSelectedSlots([]);
            setSuccess("Availability saved!");
            loadData();

        } catch (err) {
            setError("Failed to save availability.");
        } finally {
            setLoading(false);
        }
    };

    // ---------------- RENDER ----------------
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-300 shadow-md">

            <h2 className="text-2xl font-bold text-[#A31621] mb-4">
                Weekly Availability
            </h2>

            {/* CALENDAR */}
            <div className={showDeleteModal ? "pointer-events-none" : ""}>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                    allDaySlot={false}
                    slotMinTime="07:00:00"
                    slotMaxTime="18:00:00"
                    events={events}
                    height="auto"
                />
            </div>

            {/* SAVE BAR */}
            {selectedSlots.length > 0 && (
                <div className="mt-4 flex justify-between items-center bg-red-50 p-3 rounded-xl border">
                    <span className="text-sm text-red-700">
                        {selectedSlots.length} selected
                    </span>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-[#A31621] text-white px-4 py-2 rounded-xl"
                    >
                        {loading ? "Saving..." : "Save Availability"}
                    </button>
                </div>
            )}

            {/* DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
                    <div className="bg-white p-6 rounded-xl">
                        <p>Delete this availability?</p>

                        <div className="flex gap-3 mt-4">
                            <button onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ERRORS */}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}
        </div>
    );
};

export default AvailabilityCalendar;