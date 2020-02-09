import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Countries from "./components/Countries";
const AppPart1 = () => {
  const [countriesReturned, setCountries] = useState([]);
  const [countrySelection, setCountrySelection] = useState("");
  const [typing, setTyping] = useState(false);

  const handleCountrySelection = event => {
    setCountrySelection(event.target.value);
    setTyping(false);
  };

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/name/" + countrySelection)
      .then(response => {
        setCountries(response.data);
        setTyping(true);
      });
  }, [countrySelection]);

  return (
    <div>
      Query country:
      <input value={countrySelection} onChange={handleCountrySelection} />
      <ul>
        <Countries
          countryList={countriesReturned}
          typing={typing}
          setTyping={setTyping}
          useEffect={useEffect}
        />
      </ul>
    </div>
  );
};

export default AppPart1;
