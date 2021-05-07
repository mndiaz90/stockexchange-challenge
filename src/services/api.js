import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://financialmodelingprep.com/api/v3/'
});

export const apikey = 'a2da85564c0c825286c8d8ee11574dc4';
