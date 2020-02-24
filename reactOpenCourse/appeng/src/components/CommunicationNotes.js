import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

const insertPersonDetails = personEntry => {
  return axios.post(baseUrl, personEntry).then(response => {
    return response.data;
  });
};

const deletePerson = id => {
  return axios.delete(baseUrl + "/" + id);
};

const getAllPeople = () => {
  return axios.get(baseUrl);
};

export default {
  insert: insertPersonDetails,
  delete: deletePerson,
  getAll: getAllPeople
};
