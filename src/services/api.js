import Axios from 'axios';

const api = Axios.create({
  // baseURL: "http://localhost:4000/"  
  baseURL: process.env.REACT_APP_API_URL
  // baseUrl: "http://localhost:4000"
});


export default api;