import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const insertPersonDetails = personEntry => {
  return axios.post(baseUrl, personEntry).then(response => {
    return response.data;
  });
};

export default {
  insert: insertPersonDetails
};
