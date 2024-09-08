const apiKey = '7e8372022c6afb180925e2e0d3e743bf';

async function getWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            updateWeatherWidget(city);
            updateBackground(data.weather[0].description); // Actualiza el fondo según la descripción del clima
        } else {
            document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Error al obtener el clima.';
    }
}

function updateBackground(weatherDescription) {
    const body = document.body;

    // Elimina clases de fondo existentes
    body.classList.remove('default-background', 'rainy-background', 'sunny-background', 'cloudy-background');

    // Agrega clase según la descripción del clima
    switch (weatherDescription.toLowerCase()) {
        case 'lluvia':
        case 'lluvia ligera':
        case 'lluvia moderada':
        case 'tormenta':
            body.classList.add('rainy-background');
            break;

        case 'cielo despejado':
            body.classList.add('sunny-background');
            break;

        case 'pocas nubes':
        case 'nubes dispersas':
        case 'nubes rotas':
            body.classList.add('cloudy-background');
            break;

        default:
            body.classList.add('default-background');
    }
}

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=es&units=metric`);
                const data = await response.json();

                if (response.ok) {
                    const city = data.name;
                    displayWeather(data);
                    updateWeatherWidget(city);
                    updateBackground(data.weather[0].description); // Actualiza el fondo según la descripción del clima
                } else {
                    document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
                }
            } catch (error) {
                document.getElementById('weather-info').innerHTML = 'Error al obtener el clima.';
            }
        }, (error) => {
            document.getElementById('weather-info').innerHTML = 'No se pudo obtener su ubicación.';
            console.error(error);
        }, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    } else {
        document.getElementById('weather-info').innerHTML = 'La geolocalización no es soportada por este navegador.';
    }
}

function displayWeather(data) {
    const { main, weather, name } = data;
    const weatherInfo = `
        <p>Ubicación: ${name}</p>
        <p>Temperatura: ${main.temp}°C</p>
        <p>Clima: ${weather[0].description}</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

function updateWeatherWidget(city) {
    const widgetContainer = document.getElementById('widget-container');

    widgetContainer.innerHTML = `
        <div id="ww_198268b97e507" v='1.3' loc='id' a='{"t":"ticker","lang":"es","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>
            Más previsiones: 
            <a href="https://oneweather.org/${city.toLowerCase()}/30_days/" id="ww_198268b97e507_u" target="_blank">${city} 30 day forecast</a>
        </div>
        <script async src="https://app3.weatherwidget.org/js/?id=ww_198268b97e507"></script>
    `;
}

async function initAutocomplete() {
    const input = document.getElementById('city-input');
    const suggestionsList = document.getElementById('suggestions-list');

    input.addEventListener('input', async function() {
        const query = input.value;

        if (query.length < 3) {
            suggestionsList.innerHTML = ''; // Limpiar sugerencias si la consulta es muy corta
            return;
        }

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=5`);
            const results = await response.json();

            suggestionsList.innerHTML = results.map((result, index) => 
                `<li data-index="${index}" data-name="${result.display_name}">${result.display_name}</li>`
            ).join('');
        } catch (error) {
            console.error('Error al obtener las sugerencias:', error);
        }
    });

    suggestionsList.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            const selectedCity = event.target.getAttribute('data-name');
            input.value = selectedCity;
            getWeatherByCity(selectedCity);
            suggestionsList.innerHTML = ''; // Limpiar sugerencias después de la selección
        }
    });
}

// Llama a la función por defecto al cargar la página para usar la ubicación del usuario
window.onload = function() {
    getWeatherByLocation();
    initAutocomplete(); // Iniciamos el autocompletado cuando la página se carga
};
        