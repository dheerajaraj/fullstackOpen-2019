import React, { Component } from "react";
import axios from "axios";

class componentName extends Component {
  render() {
    const countryList = this.props.countryList.map((country, index) => (
      <li key={index}>{country.name}</li>
    ));

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

    const FinalRender = () => {
      if (countryList.length > 10) {
        return <p>Too many matches specify another filter</p>;
      } else if (countryList.length === 1) {
        return (
          <div>
            <h1>{this.props.countryList[0].name}</h1>
            <Info
              text="Capital: "
              details={this.props.countryList[0].capital}
            />
            <Info
              text="Population: "
              details={this.props.countryList[0].population}
            />
            <h1>Languages</h1>
            {this.props.countryList[0].languages.map((language, index) => (
              <li key={index}>{language.nativeName}</li>
            ))}
            <RenderFlagPic url={this.props.countryList[0].flag} />
          </div>
        );
      } else {
        return countryList;
      }
    };
    return (
      <div>
        <FinalRender />
      </div>
    );
  }
}
export default componentName;
