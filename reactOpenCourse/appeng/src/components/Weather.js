import React, { Component } from "react";
import apiKeys from "../apiKeys";
import axios from "axios";

const getWeatherDetails = countryCapital => {
  const weatherKeys = "c44638eb0e840086b2a0c12bac7ee435";
  const request = axios.get(
    "http://api.weatherstack.com/current?access_key=" +
      weatherKeys +
      "&query=" +
      countryCapital
  );
  return request.then(response => {
    return response.data;
  });
};

export default {
  getWeatherDetails
};
