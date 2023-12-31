import axios from 'axios';
import { BASE_URL } from '../constants';

export const fetchInitialBots = async () => {
  try {
    const apiUrl = BASE_URL;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchMoreBots = async (url) => {
  try {
    const apiUrl = url;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
