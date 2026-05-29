import { useEffect, useState } from 'react';
import {
  getDoctors,
} from '../services/doctorService';

import {
  getPatientAppointments,
  createAppointment,
  cancelAppointment,
  rescheduleAppointment,
} from '../services/appointmentService';

import { getDoctorAvailability } from '../services/availabilityService';
import { getPatientRecords } from '../services/medicalRecordService';

export const usePatientDashboard = (userId, selectedSpecialization) => {

  const [doctors, setDoctors] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorSlots, setDoctorSlots] = useState([]);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // ---------------- FETCH ----------------
  useEffect(() => {
    if (!userId) return;

    fetchDoctors();
    fetchAppointments();
    fetchRecords();
  }, [userId, selectedSpecialization]);

  const fetchDoctors = async () => {
    const data = await getDoctors(selectedSpecialization);
    setDoctors(data);
  };

  const fetchAppointments = async () => {
    const data = await getPatientAppointments(userId);

    setUpcomingAppointments(
      data.filter(
        (a) => a.status !== 'completed' && a.status !== 'cancelled'
      )
    );
  };

  const fetchRecords = async () => {
    const data = await getPatientRecords(userId);
    setMedicalRecords(data);
  };

  // ---------------- ACTIONS ----------------
  const handleViewAvailability = async (doctor) => {
    const slots = await getDoctorAvailability(doctor._id);
    setSelectedDoctor(doctor);
    setDoctorSlots(slots);
    setShowAvailabilityModal(true);
  };

  const handleSelectSlot = async (slot) => {
    if (selectedAppointment) {
      await rescheduleAppointment(selectedAppointment._id, slot._id);
      setSelectedAppointment(null);
      setShowAvailabilityModal(false);
      fetchAppointments();
      return;
    }

    setSelectedSlot(slot);
    setShowAvailabilityModal(false);
    setShowConsentModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!consentChecked) return;

    await createAppointment({
      patient: userId,
      doctor: selectedDoctor._id,
      slotId: selectedSlot._id,
      consentToShareRecords: true,
    });

    setShowConsentModal(false);
    setConsentChecked(false);
    fetchAppointments();
  };

  const handleCancelAppointment = async (id) => {
    await cancelAppointment(id);
    fetchAppointments();
  };

  const handleReschedule = async (appointment) => {
    const slots = await getDoctorAvailability(appointment.doctor._id);

    setDoctorSlots(slots);
    setSelectedAppointment(appointment);
    setShowAvailabilityModal(true);
  };

  return {
    doctors,
    upcomingAppointments,
    medicalRecords,

    selectedDoctor,
    doctorSlots,

    selectedAppointment,
    selectedSlot,

    showAvailabilityModal,
    showConsentModal,
    consentChecked,

    setConsentChecked,
    setShowAvailabilityModal,
    setShowConsentModal,

    handleViewAvailability,
    handleSelectSlot,
    handleConfirmBooking,
    handleCancelAppointment,
    handleReschedule,
    setSelectedSpecialization: null,
  };
};