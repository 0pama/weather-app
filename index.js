const functionality = (function () {
    function maininit() {
      document
        .getElementById("searchForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();
          let citynamedata = document.getElementById("name");
          if (citynamedata.value !== "") {
            console.log(citynamedata.value + "test from now");
            

            UI.showLoading();
            await functionality.initDataGathering(citynamedata.value);
            citynamedata.value = "";
          } else {
            UI.showerrortwo();
          }
        });
  
      
      window.addEventListener("load", () => {
        const searchForm = document.getElementById("searchForm");
        const nameInput = document.getElementById("name");
  
        nameInput.value = "mogadisho";
  
        const submitEvent = new Event("submit");
        searchForm.dispatchEvent(submitEvent);
      });
    }
  
    function processedBaseData(data) {
      const {
        current: {
          temp_c: tempc,
          temp_f: tempf,
          condition: { icon, text: desc },
        },
        location: { localtime: timeanddate, name: city },
      } = data;
      let time = timeanddate.split(" ")[1];
      let date = timeanddate.split(" ")[0];
      return { tempf, tempc, icon, desc, time, date, city };
    }
  
    async function initDataGathering(name) {
      let url = `https://api.weatherapi.com/v1/current.json?key=ad4523e0daf840abaf2153846242503&q=${name}`;
      try {
        const data = await fetch(url);
        if (!data.ok) {
          UI.hideLoading();
          throw new Error("falied to fetch data");
        }
        const jsondata = await data.json();
        UI.hideLoading();
        UI.hideerrorone();
        UI.hideerrortwo();
        console.log(jsondata);
        console.log("succes 1");
        const pdata = await functionality.processedBaseData(jsondata);
        UI.updatebase(pdata);
      } catch (error) {
        UI.showerrorone();
        UI.showerrortwo();
        console.log(error.message);
      }
    }
  
    return {
      initDataGathering,
      processedBaseData,
      maininit,
    };
  })();
  
  const UI = (function () {
    const descElement = document.getElementById("desc");
    const cityNameElement = document.getElementById("cityname");
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");
    const temperatureElement = document.getElementById("temperature");
    const changeTempElement = document.getElementById("changetemp");
    const weatherIconElement = document.querySelector(".sideone .svg-content");
    const searchFormElement = document.getElementById("searchForm");
    const nameInputElement = document.getElementById("name");
    const searchButtonElement = document.getElementById("searchbtn");
    const tempsign = document.getElementById("tempsign");
    const error1 = document.getElementById("error1");
    const error2 = document.getElementById("error2");
    const loadingSpinner = document.getElementById("loading");
  
    
    function showLoading() {
      loadingSpinner.style.display = "block";
    }
  
    
    function hideLoading() {
      loadingSpinner.style.display = "none";
    }
  
    function showerrorone() {
      error1.style.display = "block";
    }
  
    
    function hideerrorone() {
      error1.style.display = "none";
    }
  
    function showerrortwo() {
      error2.style.display = "block";
    }
  
    function hideerrortwo() {
      error2.style.display = "none";
    }
  
    async function updatebase(data) {
      tempchanging(data);
      let temp;
      if (changeTempElement.value == "F") {
        temp = data.tempf;
        tempsign.innerText = "°F";
      } else {
        temp = data.tempc;
        tempsign.innerText = "°C";
      }
  
      console.log(changeTempElement.value);
      dateElement.innerText = data.date;
      timeElement.innerText = data.time;
      cityNameElement.innerText = data.city;
      temperatureElement.innerText = await temp;
      descElement.innerText = data.desc;
      weatherIconElement.src = data.icon;
    }
  
    async function tempchanging(s) {
      const changeTempElement = document.getElementById("changetemp");
  
      let data = await s;
      changeTempElement.addEventListener("change", async () => {
        const changeTempElement = document.getElementById("changetemp");
  
        if (changeTempElement.value == "F") {
          temperatureElement.innerText = await data.tempf;
  
          tempsign.innerText = "°F";
        } else {
          temperatureElement.innerText = await data.tempc;
          tempsign.innerText = "°C";
        }
      });
    }
  
    return {
      updatebase,
      tempchanging,
      showLoading,
      hideLoading,
      showerrorone,
      hideerrortwo,
      showerrortwo,
      hideerrorone,
    };
  })();
  
  functionality.maininit();
  