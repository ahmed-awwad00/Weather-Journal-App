document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', performAction);

    function performAction(e) {
        console.log("Generate button clicked");
        const zipCode = document.getElementById('zip').value;
        const feelings = document.getElementById('feelings').value;

        getWeatherData(baseURL, zipCode, apiKey)
        .then(function(data) {
            console.log("Weather data received:", data);
            return postData('/add', {date: newDate, temp: data.main.temp, feel: feelings});
        })
        .then(function() {
            console.log("UI will be updated now");
            updateUI();
        });
    }

    const getWeatherData = async (baseURL, zip, key) => {
        const fullURL = baseURL + zip + '&appid=' + key;
        console.log("Fetching URL:", fullURL);
        const res = await fetch(fullURL);
        try {
            const data = await res.json();
            return data;
        } catch (error) {
            console.log("Error fetching weather data", error);
        }
    }

    const postData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        try {
            const newData = await response.json();
            return newData;
        } catch (error) {
            console.log("Error posting data", error);
        }
    }

    const updateUI = async () => {
        const request = await fetch('/all');
        try {
            const allData = await request.json();
            console.log("Updating UI with:", allData);
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degrees';
            document.getElementById('content').innerHTML = allData.feel;
        } catch (error) {
            console.log("Error updating UI", error);
        }
    }

    const apiKey = '65338aba46b8c3e01212056ca888b24a&units=imperial';
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

    let d = new Date();
    let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
});
