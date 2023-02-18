window.addEventListener("load", () => {
  let long;
  let lat;
  let timestamp;
  let dateAndTime = document.querySelector(".date");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");

  let temperatureSection = document.querySelector(".tmeperature-section");
  console.log(temperatureDegree);
  const temperatureSpan = document.querySelector(".temperature-span");
  console.log(temperatureSpan);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      console.log(position.timestamp);

      timestamp = position.timestamp;
      const dateFormat = new Date(timestamp);
      dateAndTime.innerText = dateFormat;
      console.log(dateFormat);

      long = position.coords.longitude;
      lat = position.coords.latitude;
      const apiKey = "7a9e3a57bc8243d40054131cccb9bd70";
      //   const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description } = data.weather[0];
          const { country } = data.sys;
          const { name } = data;
          temperatureDegree.innerText = temp;
          locationTimezone.innerText = `${name}, ${country}`;
          console.log(temperatureDescription.innerText);
          temperatureDescription.innerText = description;
          let formulaForCelcius = (temp - 32) * (5 / 9);
          temperatureSection.addEventListener("click", () => {
            console.log(data);
            if (temperatureSpan.innerText === "F") {
              temperatureSpan.innerText = "C";
              temperatureDegree.innerText = Math.floor(formulaForCelcius);
            } else {
              temperatureSpan.innerText = "F";
              temperatureDegree.innerText = temp;
            }
          });
        });
    });
  } else {
    let locationTimezone = document.getElementById("location-timezone");
    locationTimezone.innerText = "Sorry, not supported by Browser";
  }
});
