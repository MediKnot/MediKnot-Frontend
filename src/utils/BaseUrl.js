import axios from 'axios';

export default axios.create({
    baseURL: 'http://20.198.81.29:8080',
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});