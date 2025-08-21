const cityInput = document.getElementById('cityInput');
const button = document.getElementById('button');
const title = document.getElementById('city');
const gps = document.getElementById('gps');
const temperature = document.getElementById('temperature');
const details = document.getElementById('details');


//API Nominatim
async function fetchCoordinates(city) {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
    const data = await response.json();

    return data;

};

button.addEventListener('click', async () => {

    await displayCity()
    await fetchWeather(temperature, details)

})

async function displayCity() {

    const city = cityInput.value;
    const dataCoords = await fetchCoordinates(city);

    if (dataCoords && dataCoords.length > 0) {

        const lat = dataCoords[0].lat;
        const lon = dataCoords[0].lon;

        title.innerText = dataCoords[0].name;
        const p = document.createElement('p');
        p.innerText = `Coordonnées gps:  ${dataCoords[0].lat}, ${dataCoords[0].lon}`;
        gps.appendChild(p);

        //pour stocker lat et lon et l'utiliser dans ma fonction suivante !
        gps.dataset.lat = lat;
        gps.dataset.lon = lon;
    } else {
        title.innerText = 'Ville non trouvée'
        gps.innerHTML = '';
        temperature.innerHTML = '';
        weather.innerText = '';
    }
}


//API Open meteo
async function fetchWeather(weather, precipitation) {
    let lat = gps.dataset.lat
    let lon = gps.dataset.lon
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,relative_humidity_2m`);
    const data = await response.json();

    weather.innerText = `${data.current.temperature_2m} C°`;

    precipitation.innerText = `${data.current.precipitation} mm`;

    const humidity = document.createElement('p');
    humidity.innerText = `${data.current.relative_humidity_2m} %`;
    details.appendChild(humidity);

    return data;


}
