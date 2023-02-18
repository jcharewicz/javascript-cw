// API endpoint z którego pobieramy i wygenerowany API key.
const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'd5e0c10dc2035b4a2d463d123a8fd4a8';

// Maksymalna liczba miast, które możemy dodać
const MAX_CITIES = 10;

// Pobranie listy miast z localStorage
let cityList = JSON.parse(localStorage.getItem('cityList')) || [];

// Wybranie niezbędnych elementów DOM - lista miast, form pogody
const weatherForm = document.querySelector('#weather-form');
const cityListDiv = document.querySelector('#city-list');

// Renderowanie listy miast przy ładowaniu strony
renderCityList();

// Handler przesłania forma
weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Pobranie wartości inputu miasta
  const cityInput = document.querySelector('#city-input');
  const city = cityInput.value.trim();

  // Sprawdzenie czy miasto już jest w liście i wyplucie alerta
  if (cityList.includes(city)) {
    alert('City is already in the list!');
    return;
  }

  // Sprawdzenie czy nie została przekroczona liczba miast na stronie i wyplucie alerta
  if (cityList.length >= MAX_CITIES) {
    alert('Maximum number of cities reached!');
    return;
  }

  // Pobranie danych pogody dla miasta przez API endpointa
  fetch(`${API_ENDPOINT}?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      // Dodanie miasta do listy miast i zapisanie go do localStorage
      cityList.push(city);
      localStorage.setItem('cityList', JSON.stringify(cityList));

      // Renderowanie listy miast
      renderCityList();
    })

    // Error w przypadku błędnej / nieistniejącej nazwy miasta
    .catch(error => {
      alert('Error getting weather data, check the name of the City!');
    });

  // Wyczyszczenie input fielda
  cityInput.value = '';
});

// Funkcja do renderowanie listy miast
function renderCityList() {

  // Wyczyszczenie listy miast div'a w HTML'u
  cityListDiv.innerHTML = '';

  // Renderowanie każdego miasta jako osobnej karty
  cityList.forEach(city => {

    // Stworzenie div'a karty miasta
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    // Stworzenie headera karty z nazwą miasta
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = city;

    // Stworzenie przycisku Delete 
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {

      // Usunięcie miasta z listy miast
      cityList = cityList.filter(c => c !== city);
      localStorage.setItem('cityList', JSON.stringify(cityList));

      // Renderowanie listy miast
      renderCityList();
    });

    // Dodanie przycisku Delete do headera karty
    cardHeader.appendChild(deleteButton);

    // Stworzenie body karty z danymi o pogodzie
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Pobranie danych pogody dla miasta przez API endpointa
    fetch(`${API_ENDPOINT}?q=${city}&units=metric&appid=${API_KEY}`)
      .then(response => response.json())
      .then(data => {

        // Utworzenie elementów dla danych pogody
        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${data.main.temp} °C`;

        const humidity = document.createElement('p');
        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        const weatherIcon = document.createElement('img');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        weatherIcon.alt = data.weather[0].description;

        // Dodanie elementów z danymi pogody do body karty
        cardBody.appendChild(temperature);
        cardBody.appendChild(humidity);
        cardBody.appendChild(weatherIcon);

      })

      // Error w przypadku błędnej / nieistniejącej nazwy miasta
      .catch(error => {
        alert('Error getting weather data, check the name of the City!');
      });

    // Dodanie header'a i body karty do div'a karty
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);

    // Dodanie div'a karty do div'a listy miast
    cityListDiv.appendChild(cardDiv);
  });
}