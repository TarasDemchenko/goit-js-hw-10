import axios from 'axios';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    return breeds;
  } catch (error) {
    throw new Error('Failed to fetch breeds.');
  }
}

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

export { fetchBreeds, fetchCatByBreed, breedSelect, loader, error, catInfo };
