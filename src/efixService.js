import axios from 'axios';

// const host = '186.61.88.235:5000'
const host = 'localhost:5000'

export function validateUser(username, password, callback) {
    axios.post(`http://${host}/authUser`,{
        user: username, 
        pass: password
    }).then((response) => {
        callback(null, response);
    }).catch((error) => {
        callback(error, null);
    });
}

export function saveOrder(name, dni, email, type, brand, model, problem, callback){
    axios.post(`http://${host}/saveOrder`, {
        clientName: name,
        clientDNI: dni,
        clientEmail: email,
        productType: type,
        productBrand: brand,
        productModel: model,
        problem: problem
    }).then((response) => {
        callback(null, response);
    }).catch((error) => {
        callback(error, null);
    });
}