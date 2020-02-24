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

const updatePerson = personEntry => {
  return axios
    .put(baseUrl + "/" + personEntry.id, personEntry)
    .then(response => {
      return response.data;
    });
};

export default {
  insert: insertPersonDetails,
  delete: deletePerson,
  getAll: getAllPeople,
  update: updatePerson
};
