import axios from 'axios'

class Marker {
    async adminPost(obj, callback) {
        const res = await axios.post('/api/postadminmarker', obj);
        const value = res.data;

        callback(value);
    }
}

export default new Auth();