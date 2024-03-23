// Common methods for APIs
import * as Constants from './constants';

// Fetches API data
export const callAPI = async (endpoint: string, queryParams: string = "") => {
  try {
    const res = await fetch(`${Constants.API_URL}${endpoint}${queryParams}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching data from API');
  }
};
