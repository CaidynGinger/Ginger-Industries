import axios from 'axios';

const BASE_URL = 'http://localhost:3500'

// let refreshToken = localStorage.getItem("refreshToken");

export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'}
});
