const descElement = document.getElementById('desc');
const cityNameElement = document.getElementById('cityname');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const temperatureElement = document.getElementById('temperature');
const changeTempElement = document.getElementById('changetemp');
const weatherIconElement = document.querySelector('.sideone .svg-content');
const searchFormElement = document.getElementById('searchForm');
const nameInputElement = document.getElementById('name');
const searchButtonElement = document.getElementById('searchbtn');

document.getElementById('searchForm').addEventListener('submit',async (e) => {
    e.preventDefault()
    let data = document.getElementById("name");
   await getweatherdata(data.value)
    data.value =  ""

}) 





async function getweatherdata(name){
    let url = `https://api.weatherapi.com/v1/current.json?key=ad4523e0daf840abaf2153846242503&q=${name}`
    try{
    const data = await fetch(url);
    if(!data.ok){
        throw new Error("falied to fetch data")
    }
    const jsondata = await data.json();
    console.log(jsondata)
    let time = jsondata.location.localtime.split(" ");
    dateElement.innerText = time[0]
    timeElement.innerText = time[1]
    cityNameElement.innerText = name;
    temperatureElement.innerText = jsondata.current.temp_c;
    descElement.innerText = jsondata.current.condition.text;
    weatherIconElement.src = jsondata.current.condition.icon;
    }
    catch (error) {
        console.log(error.message)
}
}






// Add an event listener to the window's load event
window.addEventListener('load', () => {
    // Select the form element and the input element
    const searchForm = document.getElementById('searchForm');
    const nameInput = document.getElementById('name');
    
    // Set the input value to "mogadisho"
    nameInput.value = "mogadisho";
    
    // Create and dispatch a new submit event for the form
    const submitEvent = new Event('submit');
    searchForm.dispatchEvent(submitEvent);
});
