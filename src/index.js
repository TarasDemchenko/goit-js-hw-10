import { fetchBreeds } from './cat-api.js';
import axios from "axios";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

axios.defaults.headers.common['x-api-key'] =
  'live_rjq7oc9H58wfDo8wJKSIgim6FnP6u7owyB6MlHstz0oICkzgbjXAiz65ab977DSO';

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    if (response.status === 200 && response.data.length > 0) {
      const catData = response.data[0];
      const breed = catData.breeds[0];

      const image = document.createElement('img');
      image.className = 'image';
      image.src = catData.url;

      const catName = document.createElement('h2');
      catName.textContent = breed.name;

      const catDescription = document.createElement('p');
      catDescription.textContent = breed.description;

      const catTemperament = document.createElement('p');
      catTemperament.textContent = `Temperament: ${breed.temperament}`;

      catInfo.innerHTML = '';
      catInfo.appendChild(image);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);

      loader.style.display = 'none';
      catInfo.style.display = 'block';

      error.style.display = 'none';
    } else {
      handleError();
    }
  } catch (error) {
    handleError();
  }
}

function handleError() {
  loader.style.display = 'none';
  error.style.display = 'block';
}

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  try {
    await fetchCatByBreed(breedId);
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
