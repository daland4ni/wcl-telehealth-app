import { useEffect, useState } from 'react';

import {
  getDoctorAppointments,
  toggleAvailability,
} from '../services/appointmentService';

import {
  createAvailability,
} from '../services/availabilityService';

import {
  createMedicalRecord,
  getPatientRecords,
} from '../services/medicalRecordService';

export const useDoctorDashboard = (userId, isAvailableInitial) => {

  const [appointments, setAppointments] = useState([]);
  const [isAvailable, setIsAvailable] = useState(isAvailableInitial);

  // availability creation
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // consultation
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [diagnosis, setDiagnosis] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [prescription, setPrescription] = useState('');

  // records modal
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [selectedPatientRecords, setSelectedPatientRecords] = useState([]);

  // multi-slot
  const [showMultiSelectModal, setShowMultiSelectModal] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);

  // ---------------- FETCH ----------------
  useEffect(() => {
    if (!userId) return;
    fetchAppointments();
  }, [userId]);

  const fetchAppointments = async () => {
    const data = await getDoctorAppointments(userId);

    setAppointments(
      data.filter(
        (a) => a.status !== 'completed' && a.status !== 'cancelled'
      )
    );
  };

  // ---------------- AVAILABILITY ----------------
  const handleToggleAvailability = async () => {
    const data = await toggleAvailability(userId);
    setIsAvailable(data.isAvailable);
  };

  const handleCreateSlot = async () => {
    if (!selectedDate || !selectedTimeSlot) return alert('Missing fields');

    const [startTime, endTime] = selectedTimeSlot.split(' - ');

    await createAvailability({
      doctor: userId,
      date: selectedDate,
      startTime,
      endTime,
    });

    setSelectedDate('');
    setSelectedTimeSlot('');
  };

  const handleCreateMultipleSlots = async () => {
    for (const item of selectedSlots) {
      const [startTime, endTime] = item.slot.split(' - ');

      await createAvailability({
        doctor: userId,
        date: item.date,
        startTime,
        endTime,
      });
    }

    setSelectedSlots([]);
    setShowMultiSelectModal(false);
  };

  // ---------------- CONSULTATION ----------------
  const handleStartConsultation = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConsultationModal(true);
  };

  const handleSubmitConsultation = async () => {
    await createMedicalRecord({
      appointmentId: selectedAppointment._id,
      diagnosis,
      consultationNotes,
      prescription,
    });

    setShowConsultationModal(false);
    setDiagnosis('');
    setConsultationNotes('');
    setPrescription('');
    setSelectedAppointment(null);

    fetchAppointments();
  };

  // ---------------- RECORDS ----------------
  const handleViewRecords = async (patientId) => {
    const data = await getPatientRecords(patientId);

    setSelectedPatientRecords(data);
    setShowRecordsModal(true);
  };

  return {
    appointments,
    isAvailable,

    selectedDate,
    setSelectedDate,
    selectedTimeSlot,
    setSelectedTimeSlot,

    showConsultationModal,
    setShowConsultationModal,
    selectedAppointment,

    diagnosis,
    setDiagnosis,
    consultationNotes,
    setConsultationNotes,
    prescription,
    setPrescription,

    showRecordsModal,
    setShowRecordsModal,
    selectedPatientRecords,

    showMultiSelectModal,
    setShowMultiSelectModal,
    selectedSlots,
    setSelectedSlots,

    handleToggleAvailability,
    handleCreateSlot,
    handleCreateMultipleSlots,
    handleStartConsultation,
    handleSubmitConsultation,
    handleViewRecords,
  };
};