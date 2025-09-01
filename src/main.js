// main.js
// import './styles/reset.css';
import './styles/styles.css';
const { Weather } = require('./Library/weather');

function main() {


const apiKey = 'F87ECN6S8WZ7TDH8B6CNV7KA4';
const wxForm = document.querySelector('.weather-form');
const locationInput = document.querySelector('.location-input');
const usDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'});

const currentLocation = document.getElementById('current-location');
const currentDate = document.getElementById('date');
const currentTemp = document.getElementById('current-temp');

let location = 'Myrtle Beach';
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate()+1);

const todayStr = getDateString(today);
const tomorrowStr = getDateString(tomorrow);
//start with some default data  for my location
showWeather(location);
//here is the main fetch using the Visual Crossing API library
async function showWeather(location){
    try {
            const weather = new Weather(apiKey);
            // fetch from the Visual Crossing API
            await weather.fetchWeatherData(
                                        location, 
                                        todayStr, 
                                        tomorrowStr,
                                        '',
                                        'hours');
            displayWeatherData(weather, location);
        }
        catch(error) {
            console.error(error);
            displayError(error);
        }
}

//fetch on submit
wxForm.addEventListener("submit", async event => {
    event.preventDefault();
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('error-display');
    
    location = locationInput.value;
    if(location){
        showWeather(location);
    } else{
        displayError('ERROR: Enter a location')
    }
});
//display error message
function displayError(message){
  const errorMessage = document.querySelector('.error-message');
  errorMessage.classList.add('error-display');
  errorMessage.textContent = '';
  errorMessage.textContent = message;
}

function getDateString(date){
    return date.toISOString().split('T')[0];
}
function displayWeatherData(weather, locationInput){
    currentLocation.textContent = 'Current weather in ' + locationInput;
    //long date
    currentDate.textContent = usDate;
   //values of interest to display
    const weatherValues = weather.getDataOnDay(todayStr, 
        ['temp', 'icon', 'feelslike', 'description', 'conditions','tempmax', 'tempmin'
    ]);
    //the api tries to resolve locations and what it returns is not always obvious
    //so let's display it if tehere is a value
    const resolvedAddress = weather.getResolvedAddress();
    const resolvedLocation = document.getElementById('resolved-location');
    if(resolvedAddress){
        resolvedLocation.textContent = "(" + resolvedAddress + ")";
    } else {
        resolvedLocation.textContent = "";
    }
    //display the values
    //big temp
    currentTemp.textContent = weatherValues['temp']+'\u00b0';
    //weather icon
    const imgElement = document.querySelector('#wx-icon img.weather-icon');
    imgElement.src = './'+ weatherValues['icon'] + '.png';
    //feels like
    const feelsLike = document.getElementById('feels-like');
    feelsLike.textContent = 'Feels like ' + weatherValues['feelslike'] +'\u00b0' +'F';
    //short description of conditions
    const conditions = document.getElementById('conditions');
    conditions.textContent = weatherValues['conditions'];
    //high
    const hiTemp = document.getElementById('hi');
    hiTemp.textContent = 'High '+ weatherValues['tempmax']+'\u00b0' +'F';
    //low
    const loTemp = document.getElementById('lo');
    loTemp.textContent = 'Low ' + weatherValues['tempmin']+'\u00b0' +'F';
    //longer description
    const wxMessage = document.getElementById('wx-message');
    wxMessage.textContent = weatherValues['description']
}

};

// Run the app
main();
