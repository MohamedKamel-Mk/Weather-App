let Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let search = document.getElementById("search");

let defaultLocation = "Cairo";

getWeather(defaultLocation);

search.addEventListener("input", function() {
    let location = search.value;
    getWeather(location);
});

async function getWeather(location) {
    try {
        let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=9284cd590d074d43bde120931240701&q=${location}&days=3&aqi=no&alerts=no`);
        let res = await data.json();
        console.log(res);

        if (res.forecast && res.forecast.forecastday) {
            for (let i = 0; i < Math.min(3, res.forecast.forecastday.length); i++) {
                const dayForecast = res.forecast.forecastday[i];
                const dayOfWeek = new Date(dayForecast.date).getDay(); // 0 to 6 (Sunday to Saturday)

                const tempC = dayForecast.day && dayForecast.day.avgtemp_c;

                document.querySelector(`#day${i + 1}`).innerHTML = `
                    <div class="info-txt d-flex justify-content-between mb-3">
                        <div class="day">${Days[dayOfWeek]}</div>
                        <div class="data">${dayForecast.date}</div>
                    </div>
                    <div class="info-country">
                        <div class="country fs-4">${res.location.name}</div>
                    </div>
                    <div class="info-temp d-flex align-items-center">
                        <div class="info-num fw-bold">${tempC}°C</div>
                        <div class="icon"><img src="${dayForecast.day.condition.icon}" alt="Weather Icon"></div>
                    </div>
                    <h6 class="py-3 custom">${dayForecast.day.condition.text}</h6>
                `;
            }
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}