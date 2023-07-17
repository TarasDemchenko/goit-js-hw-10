import axios from 'axios';

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    return breeds;
  } catch (error) {
    throw new Error('Failed to fetch breeds.');
  }
}

export { fetchBreeds };
