import axios from 'axios'

//const host = 'x.x.x.x:5000' // When accessing from another network (public IP) or from another pc (local IP)
const host = 'localhost:5000' // When accessing locally

export function validateUser(username, password, callback) {
    axios.post(`http://${host}/auth`,{user: username, pass: password})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function isAuthored(callback){
    axios.get(`http://${host}/isAuthored`)
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function logOut(callback){
    axios.get(`http://${host}/endSession`)
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
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
    }).then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function getAllOrders(callback){
    axios.get(`http://${host}/getAllOrders`).then((response) => { 
        const resultList = []
        response.data.forEach(elem => {
            const order = {    
                id: elem.id,  
                user: elem.usuario_tecnico,                            
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
        })
        callback(null, resultList)
    }).catch((error) => callback(error, null))
}

export function updateState(id, state, callback){
    axios.post(`http://${host}/updateState/${id}/${state}`, {})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function loadBudget(id, diagnosis, budget, callback){
    axios.post(`http://${host}/loadBudget`, {
        id: id,
        diagnosis: diagnosis,
        budget: budget
    }).then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function searchOrders(string, callback){
    axios.get(`http://${host}/search/${string}`).then((response) => { 
        const resultList = []
        response.data.forEach(elem => {
            const order = {    
                id: elem.id,            
                user: elem.usuario_tecnico,                
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
        })
        callback(null, resultList)
    }).catch((error) => callback(error, null))
}

export function searchOrderForApproval(dni, id, callback){
    axios.get(`http://${host}/budgetApproval/${dni}/${id}`).then((response) => {
        const order = {    
            id: response.data.id,                      
            name: response.data.nombre_cliente,
            dni: response.data.dni_cliente,
            email: response.data.email_cliente,
            type: response.data.tipo_producto,
            brand: response.data.marca_producto,
            model: response.data.modelo_producto,
            problem: response.data.problema_inicial,
            diagnosis: response.data.diagnostico,
            budget: response.data.presupuesto,
            state: response.data.estado_producto,
            lastUpdateDate: response.data.fecha_actualizacion
        }
        callback(null, order)
    }).catch((error) => callback(error, null))
}

export function sendClientResponse(id, dni, choice, callback){
    axios.post(`http://${host}/clientResponse/${id}/${dni}`, {choice: choice})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function createUser(user, pass, callback){
    axios.post(`http://${host}/newUser`, {user: user, pass: pass})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function changePass(user, pass, callback){
    axios.post(`http://${host}/updatePassword`, {user: user, newPass: pass})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function saveSettings(settings, callback){
    axios.post(`http://${host}/saveSettings`, {settings: settings})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function getSettings(callback){
    axios.get(`http://${host}/getSettings`)
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function getOAuthURL(callback){
    axios.get(`http://${host}/emailOAuth`)
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}

export function sendOAuthCode(code, callback){
    axios.post(`http://${host}/OAuthCode`, {code: code})
    .then((response) => callback(null, response))
    .catch((error) => callback(error, null))
}