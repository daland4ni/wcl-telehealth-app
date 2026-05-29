import API from '../api/axios';


// CREATE APPOINTMENT
export const createAppointment =
    async (appointmentData) => {

        const response =
            await API.post(
                '/appointments',
                appointmentData
            );

        return response.data;
    };


// GET PATIENT APPOINTMENTS
export const getPatientAppointments =
    async (patientId) => {

        const response =
            await API.get(
                `/appointments/patient/${patientId}`
            );

        return response.data;
    };


// GET DOCTOR APPOINTMENTS
export const getDoctorAppointments =
    async (doctorId) => {

        const response =
            await API.get(
                `/appointments/doctor/${doctorId}`
            );

        return response.data;
    };


// TOGGLE AVAILABILITY
export const toggleAvailability =
    async (doctorId) => {

        const response =
            await API.put(
                `/appointments/doctor/${doctorId}/availability`
            );

        return response.data;
    };

// CANCEL APPOINTMENT
export const cancelAppointment =
    async (appointmentId) => {

        const response =
            await API.put(
                `/appointments/cancel/${appointmentId}`
            );

        return response.data;
    };


// RESCHEDULE APPOINTMENT
export const rescheduleAppointment =
    async (
        appointmentId,
        newSlotId
    ) => {

        const response =
            await API.put(
                `/appointments/reschedule/${appointmentId}`,
                {
                    newSlotId,
                }
            );

        return response.data;
    };

export const startConsultation =
    async (appointmentId) => {

        const response =
            await API.put(
                `/appointments/${appointmentId}/start-consultation`
            );

        return response.data;
    };