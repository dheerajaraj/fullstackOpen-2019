import React, { useState, Component } from "react";
import axios from "axios";
import weather from "./Weather";

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cid: -1,
      weatherDetails: {
        location: "",
        current: {
          temperature: "",
          weather_icons: []
        }
      }
    };
  }
  render() {
    const setCid = () => {
      if (this.props.typing === true) {
        this.setState({
          cid: -1,
          ...this.state.weatherDetails
        });
        this.props.setTyping(false);
      }
    };
    const setWeatherDetails = cid => {
      const countryCapital = this.props.countryList[cid].capital;
      weather.getWeatherDetails(countryCapital).then(weatherDetail => {
        this.setState({
          ...this.state.cid,
          weatherDetails: weatherDetail
        });
      });
    };

    setCid();

    const handleDisplayClick = event => {
      event.preventDefault();
      this.setState({
        cid: event.target.id,
        ...this.state.weatherDetails
      });
      setWeatherDetails(event.target.id);
    };

    const Info = props => {
      return (
        <p>
          {props.text}
          {props.details}
        </p>
      );
    };

    const RenderFlagPic = props => {
      return <img src={props.url} alt={props.url} width="260" height="200" />;
    };

    const RenderIndividualCountry = props => {
      return (
        <div>
          <h1>{props.name}</h1>
          <Info text="Capital: " details={props.capital} />
          <Info text="Population: " details={props.population} />
          <h1>Languages</h1>
          {props.languages.map((language, index) => (
            <li key={index}>{language.nativeName}</li>
          ))}
          <RenderFlagPic url={props.url} />
        </div>
      );
    };
    const RenderSelectedCountry = () => {
      return this.state.cid >= 0 &&
        this.state.cid < this.props.countryList.length ? (
        <div>
          <RenderIndividualCountry
            name={this.props.countryList[this.state.cid].name}
            capital={this.props.countryList[this.state.cid].capital}
            url={this.props.countryList[this.state.cid].flag}
            languages={this.props.countryList[this.state.cid].languages}
            population={this.props.countryList[this.state.cid].population}
          />
        </div>
      ) : (
        <p></p>
      );
    };

    const RenderWeather = () => {
      if (
        this.props.countryList.length === 0 ||
        this.state.weatherDetails.location === ""
      ) {
        return <p></p>;
      } else {
        return (
          <div>
            <h1>Weather in {this.state.weatherDetails.location.name}</h1>
            <p>
              <strong>temperature: </strong>
              {this.state.weatherDetails.current.temperature} Celcius
            </p>
            <img
              src={this.state.weatherDetails.current.weather_icons[0]}
              alt={this.state.weatherDetails.current.weather_icons[0]}
              width="260"
              height="200"
            />
            <p>
              <strong>wind: </strong>
              {this.state.weatherDetails.current.wind_speed} kph direction{" "}
              {this.state.weatherDetails.current.wind_dir}
            </p>
          </div>
        );
      }
    };
    const List = () => {
      return this.props.countryList.map((country, index) => (
        <li key={index}>
          {country.name}{" "}
          <button onClick={handleDisplayClick} id={index}>
            show
          </button>
        </li>
      ));
    };

    const FinalRender = () => {
      if (this.props.countryList.length > 10) {
        return <p>Too many matches specify another filter</p>;
      } else if (this.props.countryList.length === 1) {
        return (
          <div>
            <RenderIndividualCountry
              name={this.props.countryList[0].name}
              capital={this.props.countryList[0].capital}
              url={this.props.countryList[0].flag}
              languages={this.props.countryList[0].languages}
              population={this.props.countryList[0].population}
            />
            <RenderWeather />
          </div>
        );
      }
      return (
        <div>
          <List />
          <RenderSelectedCountry />
          <RenderWeather />
        </div>
      );
    };

    return (
      <div>
        <FinalRender />
      </div>
    );
  }
}
export default componentName;
