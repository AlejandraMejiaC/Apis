// Obtén los datos de las fotos desde JSONPlaceholder
fetch('https://jsonplaceholder.typicode.com/photos')
  .then(response => response.json())
  .then(photos => {
    // Filtra las primeras 10 fotos
    const firstTenPhotos = photos.slice(0, 10);

    // Crea una galería de imágenes en el documento HTML
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'gallery';

    firstTenPhotos.forEach(photo => {
      const imageElement = document.createElement('img');
      imageElement.src = photo.url;
      imageElement.alt = photo.title;

      const photoInfoElement = document.createElement('p');
      photoInfoElement.textContent = `ID: ${photo.id} - ${photo.title}`;

      const photoContainer = document.createElement('div');
      photoContainer.className = 'photo-container';
      photoContainer.appendChild(imageElement);
      photoContainer.appendChild(photoInfoElement);

      galleryContainer.appendChild(photoContainer);
    });

    document.body.appendChild(galleryContainer);
  })
  .catch(error => console.error('Error fetching photos:', error));
  
  function buscarTemperatura() {
    const apiKey = 'e63565e9d9836043d3b9634097e38bcf'; // Reemplaza con tu clave de API de OpenWeatherMap
    const cityInput = document.getElementById('cityInput');
    const ciudad = cityInput.value;

    // Verifica si se ingresó una ciudad
    if (ciudad.trim() === '') {
      alert('Por favor, ingrese el nombre de una ciudad.');
      return;
    }

    // Realiza la solicitud a la API de OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
        // Verifica si 'main' y 'temp' existen en la respuesta
        if (data.main && data.main.temp !== undefined) {
          // Muestra los resultados en la página
          const resultadosDiv = document.getElementById('resultados');
          resultadosDiv.innerHTML = `<p>Temperatura actual en ${data.name}: ${data.main.temp}°C</p>`;
        } else {
          alert('No se pudo obtener la temperatura. Por favor, inténtalo de nuevo.');
        }
      })
      .catch(error => {
        console.error('Error al obtener la temperatura:', error);
        alert('No se pudo obtener la temperatura. Por favor, inténtalo de nuevo.');
      });
  }

  async function searchPokemon() {
    const input = document.getElementById('pokemon-input').value.toLowerCase();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${input}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      displayPokemon(data);
    } catch (error) {
      console.error('Error fetching data from PokeAPI:', error);
    }
  }
  
  function displayPokemon(pokemon) {
    const pokemonCard = document.getElementById('pokemon-card');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonAbilities = document.getElementById('pokemon-abilities');
    const pokemonTypes = document.getElementById('pokemon-types');
    const pokemonMoves = document.getElementById('pokemon-moves');
  
    pokemonImage.src = pokemon.sprites.front_default;
    pokemonName.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemonAbilities.textContent = `Abilities: ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`;
    pokemonTypes.textContent = `Types: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    pokemonMoves.textContent = `Moves: ${pokemon.moves.map(move => move.move.name).join(', ')}`;
  
    pokemonCard.classList.remove('hidden');
  }