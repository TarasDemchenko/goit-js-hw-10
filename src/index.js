import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import axios from 'axios';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_rjq7oc9H58wfDo8wJKSIgim6FnP6u7owyB6MlHstz0oICkzgbjXAiz65ab977DSO';

function handleError() {
  loader.style.display = 'none';
  error.style.display = 'block';
}

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  try {
    await fetchCatByBreed(breedId, catInfo, loader, error);
  } catch (error) {
    handleError();
  }
});

window.addEventListener('load', async () => {
  loader.style.display = 'block';

  try {
    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  } catch (error) {
    handleError();
  }
});
