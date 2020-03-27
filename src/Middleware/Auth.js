import axios from 'axios'

class Auth {

    async login (obj, callback) {
        const res = await axios.post('/api/checklogin', obj);
        const value = res.data;

        callback(value);
    }

    async signup (obj, callback) {
        const res = await axios.post('/api/signup', obj);
        const value = res.data;

        callback(value);
    }
}

export default new Auth();