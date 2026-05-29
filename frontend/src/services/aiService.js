import API from '../api/axios';

export const getSpecialistRecommendation =
  async (symptoms) => {

    const response =
      await API.post(
        '/ai/recommend-specialist',
        { symptoms }
      );

    return response.data;
  };