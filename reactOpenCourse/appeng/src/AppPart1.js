import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Countries from "./components/Countries";
const AppPart1 = () => {
  const [countriesReturned, setCountries] = useState([]);
  const [countrySelection, setCountrySelection] = useState("");

  const handleCountrySelection = event => {
    setCountrySelection(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/name/" + countrySelection)
      .then(response => {
        setCountries(response.data);
      });
  }, [countrySelection]);

  return (
    <div>
      Query country:
      <input value={countrySelection} onChange={handleCountrySelection} />
      <ul>
        <Countries countryList={countriesReturned} />
      </ul>
    </div>
  );
};

export default AppPart1;
