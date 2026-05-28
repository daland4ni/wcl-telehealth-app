import API from '../api/axios';

export const getDoctors = async (
  specialization = ''
) => {
  const response = await API.get(
    `/doctors?specialization=${specialization}`
  );

  return response.data;
};