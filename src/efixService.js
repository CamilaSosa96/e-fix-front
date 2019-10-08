import axios from 'axios';

//const host = '10.15.77.95:5000' // When accessing from another network (public IP) or from another pc (local IP)
const host = 'localhost:5000' // When accessing locally

export function validateUser(username, password, callback) {
    axios.post(`http://${host}/auth`,{
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

export function getAllOrders(callback){
    axios.get(`http://${host}/getAllOrders`).then((response) =>{ 
        const orderList = response.data.result; 
        const resultList = [];
        orderList.forEach(elem => {
            const order = {    
                id: elem.id,                              
                name: elem.nombre_cliente,
                dni: elem.dni_cliente,
                email: elem.email_cliente,
                type: elem.tipo_producto,
                brand: elem.marca_producto,
                model: elem.modelo_producto,
                problem: elem.problema_inicial,
                diagnosis: elem.diagnostico,
                budget: elem.presupuesto,
                state: elem.estado_producto,
                lastUpdateDate: elem.fecha_actualizacion
            }
            resultList.push(order)
        });
        callback(null, resultList);
    }).catch((error) => {
        callback(error, null);
    })
}

export function updateState(id, state, callback){
    axios.post(`http://${host}/updateState/${id}/${state}`, {}).then((response) =>{
        callback(null, response);
    }).catch((error) => {
        callback(error, null);
    })
}

export function searchOrders(string, callback){
    axios.get(`http://${host}/search/${string}`).then((response) =>{ 
        const orderList = response.data.result; 
        const resultList = [];
        orderList.forEach(elem => {
            const order = {    
                id: elem.id,                              
                name: elem.nombre_cliente,
                dni: elem.dni_cliente,
                email: elem.email_cliente,
                type: elem.tipo_producto,
                brand: elem.marca_producto,
                model: elem.modelo_producto,
                problem: elem.problema_inicial,
                diagnosis: elem.diagnostico,
                budget: elem.presupuesto,
                state: elem.estado_producto,
                lastUpdateDate: elem.fecha_actualizacion
            }
            resultList.push(order)
        });
        callback(null, resultList);
    }).catch((error) => {
        callback(error, null);
    })
}