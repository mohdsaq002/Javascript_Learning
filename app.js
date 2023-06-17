const apiUrl = 'https://rickandmortyapi.com/api/character';
let nextPageUrl = '';

function fetchCharacters(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayCharacters(data.results);
      nextPageUrl = data.info.next;
    })
    .catch(error => console.error('Error:', error));
}

function displayCharacters(characters) {
  const characterContainer = document.getElementById('characterContainer');
  characterContainer.innerHTML = '';

  characters.forEach(character => {
    const card = createCharacterCard(character);
    characterContainer.appendChild(card);
  });
}

function createCharacterCard(character) {
  const card = document.createElement('div');
  card.className = 'card';

  const image = document.createElement('img');
  image.src = character.image;
  card.appendChild(image);

  const details = document.createElement('div');
  details.className = 'card-content';

  const name = document.createElement('h2');
  name.textContent = character.name;
  details.appendChild(name);

  const species = document.createElement('p');
  species.textContent = `Species: ${character.species}`;
  details.appendChild(species);

  const gender = document.createElement('p');
  gender.textContent = `Gender: ${character.gender}`;
  details.appendChild(gender);

  const location = document.createElement('p');
  location.textContent = `Location: ${character.location.name}`;
  details.appendChild(location);

  const firstEpisode = document.createElement('p');
  firstEpisode.textContent = `First Episode: ${character.episode[0]}`;
  details.appendChild(firstEpisode);

  card.appendChild(details);

  return card;
}

function applyFilters() {
  const filterName = document.getElementById('filterName').value.trim().toLowerCase();
  const filterSpecies = document.getElementById('filterSpecies').value;
  const filterGender = document.getElementById('filterGender').value;

  let url = apiUrl;

  if (filterName) {
    url += `?name=${filterName}`;
  }

  if (filterSpecies) {
    url += `&species=${filterSpecies}`;
  }

  if (filterGender) {
    url += `&gender=${filterGender}`;
  }

  fetchCharacters(url);
}

function loadMoreCharacters() {
  if (nextPageUrl) {
    fetchCharacters(nextPageUrl);
  }
}

document.getElementById('filterButton').addEventListener('click', applyFilters);

document.getElementById('filterName').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    applyFilters();
  }
});

document.getElementById('loadMoreButton').addEventListener('click', loadMoreCharacters);

fetchCharacters(apiUrl);
