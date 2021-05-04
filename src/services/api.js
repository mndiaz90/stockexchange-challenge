import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://financialmodelingprep.com/api/v3/'
});

export const apikey = '66b3224598c7c0a79b44b4fdac4a97dc';
