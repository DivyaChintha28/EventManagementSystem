import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // ✅ backend route prefix
});

export default API;
