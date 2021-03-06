import axios from 'axios';

const axiosHandler = axios.create({
    baseURL: 'https://happy-loft.herokuapp.com/',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
});

export default axiosHandler;