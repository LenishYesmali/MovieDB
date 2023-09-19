import axios from 'axios';
import {API_KEY} from '../constants/constant';

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchmovies = async (type: string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=1`,
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    throw error;
  }
};
