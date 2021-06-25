import axios from 'axios';

export default axios.create({
    baseURL: 'http://20.198.81.29:5003',
    headers: {
        'Content-Type': 'application/json'
    }
}); 