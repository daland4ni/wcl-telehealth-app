import API from '../api/axios';


// CREATE APPOINTMENT
export const createAppointment =
  async (appointmentData) => {
    const response = await API.post(
      '/appointments',
      appointmentData
    );

    return response.data;
  };


// GET DOCTOR APPOINTMENTS
export const getDoctorAppointments =
  async (doctorId) => {
    const response = await API.get(
      `/appointments/doctor/${doctorId}`
    );

    return response.data;
  };


// TOGGLE AVAILABILITY
export const toggleAvailability =
  async (doctorId) => {
    const response = await API.put(
      `/appointments/doctor/${doctorId}/availability`
    );

    return response.data;
  };