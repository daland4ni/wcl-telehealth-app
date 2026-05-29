import API from '../api/axios';


// CREATE RECORD
export const createMedicalRecord =
  async (recordData) => {

    const response =
      await API.post(
        '/medical-records',
        recordData
      );

    return response.data;
  };


// GET PATIENT RECORDS
export const getPatientRecords =
  async (patientId) => {

    const response =
      await API.get(
        `/medical-records/patient/${patientId}`
      );

    return response.data;
  };


// GET DOCTOR RECORDS
export const getDoctorRecords =
  async (doctorId) => {

    const response =
      await API.get(
        `/medical-records/doctor/${doctorId}`
      );

    return response.data;
  };