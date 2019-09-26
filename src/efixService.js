import axios from 'axios';

const host = '186.61.88.235:5000'

export default function validateUser(username, password, callback) {
    axios.post(`http://${host}/authUser`,{
    user: username, 
    pass: password
    }).then((response) => {
        callback(null, response);
    }).catch((error) => {
        callback(error, null);
    });
}