import API from '../api/axios';


// CREATE SLOT
export const createAvailability =
  async (slotData) => {
    const response = await API.post(
      '/availability',
      slotData
    );

    return response.data;
  };


// GET DOCTOR SLOTS
export const getDoctorAvailability =
  async (doctorId) => {
    const response = await API.get(
      `/availability/doctor/${doctorId}`
    );

    return response.data;
  };


// BOOK SLOT
export const bookAvailability =
  async (slotId) => {
    const response = await API.put(
      `/availability/book/${slotId}`
    );

    return response.data;
  };

export const deleteAvailability = async (id) => {
  console.log("Deleting slot ID:", id);
  const response = await API.delete(`/availability/${id}`);
  return response.data;
};