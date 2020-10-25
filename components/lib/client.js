const { default: Axios } = require("axios");

const axiosInstance = Axios.create({
  baseURL: process.env.API_URL,
  // baseURL: 'https://jsonplaceholder.typicode.com'
  // baseURL: "http://[::1]:8000"
});

module.exports = axiosInstance;