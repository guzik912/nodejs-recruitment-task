const axios = require('axios');
const { MOVIES_API_KEY } = process.env;
const API_URL = `http://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&t=`;

const request = (endpoint, method = 'GET', data = null) => {
  const url = `${API_URL}${endpoint}`;

  return method === 'GET' && axios.get(url);
};

const fetchMovie = (endpoint) => request(endpoint);

module.exports = {
  fetchMovie
};
