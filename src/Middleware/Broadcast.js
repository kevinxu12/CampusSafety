import axios from 'axios'

class Broadcast {
    async makebroadcast(obj, callback) {
        const res = await axios.post('/api/makebroadcast', obj);
        const value = res.data;

        callback(value);
    }
}

export default new Broadcast();