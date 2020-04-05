import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const insertPersonDetails = async personEntry => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, personEntry, config);
  return response.data;
};

const deletePerson = id => {
  const config = {
    headers: { Authorization: token }
  };
  return axios.delete(baseUrl + "/" + id, config);
};

const getAllPeople = () => {
  return axios.get(baseUrl);
};

const updatePerson = personEntry => {
  const config = {
    headers: { Authorization: token }
  };
  return axios
    .put(baseUrl + "/" + personEntry.id, personEntry, config)
    .then(response => {
      return response.data;
    });
};

export default {
  insert: insertPersonDetails,
  delete: deletePerson,
  getAll: getAllPeople,
  update: updatePerson,
  setToken
};
