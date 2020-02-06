import React, { useState, Component } from "react";
import axios from "axios";

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = { cid: -1 };
  }
  render() {
    const handleDisplayClick = event => {
      event.preventDefault();
      this.setState({
        cid: event.target.id
      });
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
        <RenderIndividualCountry
          name={this.props.countryList[this.state.cid].name}
          capital={this.props.countryList[this.state.cid].capital}
          url={this.props.countryList[this.state.cid].flag}
          languages={this.props.countryList[this.state.cid].languages}
          population={this.props.countryList[this.state.cid].population}
        />
      ) : (
        <p></p>
      );
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
          <RenderIndividualCountry
            name={this.props.countryList[0].name}
            capital={this.props.countryList[0].capital}
            url={this.props.countryList[0].flag}
            languages={this.props.countryList[0].languages}
            population={this.props.countryList[0].population}
          />
        );
      }
      return (
        <div>
          <List />
          <RenderSelectedCountry />
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
