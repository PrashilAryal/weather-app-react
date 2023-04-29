import React, { Component } from "react";
import axios from "axios";
import "./assets/css/Weather.css";

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      // latLon: {},
    };
  }

  getWeatherData = (city) => {
    const apiKey = "e982435d4bdd70820a99ba33e7ff0cc0";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // getWeather = (lat, lon) => {
  //   const apiKey = "e982435d4bdd70820a99ba33e7ff0cc0";
  //   axios
  //     .get(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`
  //     )
  //     .then((response) => {
  //       this.setState({ latLon: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    this.getWeatherData(city);
    // this.getWeather(this.latLon.lat, this.latLon.lon);
  };
  render() {
    const { data } = this.state;
    // const { latLon } = this.state;

    return (
      <div className="weather-container">
        <div className="weather-input">
          <form onSubmit={this.handleSubmit}>
            <label>City:</label>
            <input type="text" name="city" />
            <button type="submit">Get Weather</button>
          </form>
        </div>
        {data.main && (
          <div className="weather-card">
            <h2>{data.name}</h2>
            <p>{data.weather[0].description}</p>
            <p>Temperature: {data.main.temp} F</p>
            <p>Humidity: {data.main.humidity}%</p>
            {/* <p>Cloud: {data.main.cloud}%</p> */}
            {/* <p>Wind Speed: {data.main.wind_speed} km/hr</p> */}
          </div>
        )}
      </div>
    );
  }
}
export default Weather;
