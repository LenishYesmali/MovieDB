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

export const fetchgenres = async (genre_ids: number[]) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en`,
    );
    const allGenres = response.data.genres;

    const filteredGenres = allGenres.filter(genre =>
      genre_ids.includes(genre.id),
    );

    return filteredGenres;
  } catch (error) {
    console.error('Error Fetching Genres: ', error);
    throw error;
  }
};

export const fetchvideos = async (movie_id: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`,
    );

    return response.data.results;
  } catch (error) {
    console.error('Error Fetching Video: ', error);
  }
};
