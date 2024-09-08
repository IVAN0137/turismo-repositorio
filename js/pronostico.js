// Inserta tu clave API gratuita de OpenWeatherMap aquí
const apiKey = '7e8372022c6afb180925e2e0d3e743bf';

async function getWeatherByCity() {
    const city = document.getElementById('city-input').value;
    if (city === '') {
        alert('Por favor, ingrese una ciudad');
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=es&units=metric`);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
            updateWeatherWidget(city); // Actualizamos el widget según la ciudad
        } else {
            document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = 'Error al obtener el clima.';
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
                    displayWeather(data);
                    updateWeatherWidget(data.name); // Actualizamos el widget según la ubicación
                } else {
                    document.getElementById('weather-info').innerHTML = `Error: ${data.message}`;
                }
            } catch (error) {
                document.getElementById('weather-info').innerHTML = 'Error al obtener el clima.';
            }
        }, () => {
            document.getElementById('weather-info').innerHTML = 'No se pudo obtener su ubicación.';
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

    // Crear el nuevo widget dinámicamente
    widgetContainer.innerHTML = `
        <div id="ww_198268b97e507" v='1.3' loc='id' a='{"t":"ticker","lang":"es","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'>
            Más previsiones: 
            <a href="https://oneweather.org/${city.toLowerCase()}/30_days/" id="ww_198268b97e507_u" target="_blank">${city} 30 day forecast</a>
        </div>
        <script async src="https://app3.weatherwidget.org/js/?id=ww_198268b97e507"></script>
    `;
}

// Llama a la función por defecto al cargar la página para usar la ubicación del usuario
window.onload = getWeatherByLocation;
