import API from '../api/axios';


// AVAILABLE DOCTORS
export const getDoctors = async (
  specialization = ''
) => {
  const response = await API.get(
    `/doctors?specialization=${specialization}`
  );

  return response.data;
};


// ALL DOCTORS
export const getAllDoctors =
  async () => {
    const response =
      await API.get('/doctors/all');

    return response.data;
  };