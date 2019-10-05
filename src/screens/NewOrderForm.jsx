import React from 'react'
import { Redirect } from "react-router-dom";
import {saveOrder} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import {Button, InputGroup, Alert} from '@blueprintjs/core'

class NewOrderForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: "",
            dni: "",
            email: "",
            type: "",
            brand: "",
            model: "",
            problem: "",
            alert: false,
            alertMSJ: "",
            onAlertClick: this.goBackHome,
            goHome: false
        }
        this.handleOrderCreation = this.handleOrderCreation.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isValidOrder = this.isValidOrder.bind(this)
        this.goBackHome = this.goBackHome.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
    }

    handleOrderCreation(event){
        if(this.isValidOrder()){
            saveOrder(this.state.name, this.state.dni, this.state.email, this.state.type,
                      this.state.brand, this.state.model, this.state.problem, (err, response) => {
                        this.setState({onAlertClick: this.goBackHome, 
                                       alertMSJ: 'Orden creada exitosamente', 
                                       alert: true})
                      })
        }  else {
            this.setState({onAlertClick: this.closeAlert,
                           alertMSJ: 'Por favor, complete todos los campos', 
                           alert: true})
        }  
        event.preventDefault()
    }

    isValidOrder(){
        return(
            this.state.name !== "" && this.state.dni !== "" &&
            this.state.email !== "" && this.state.type !== "" &&
            this.state.brand !== "" && this.state.model !== "" &&
            this.state.problem !== ""
        )
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    closeAlert(){
        this.setState({alert: false})
    }

    goBackHome(){
        this.setState({goHome: true})
    }

    render(){
        return(
            <div>
                {this.state.alert && 
                    <Alert
                        isOpen={this.state.alert} 
                        onClose={this.state.onAlertClick}>
                        {this.state.alertMSJ}
                    </Alert>}
                {this.state.goHome && <Redirect to="/home"/>}
                <NavigationBar/>
                <h1>Crear nueva orden de reparación</h1>
                <form onSubmit={this.handleOrderCreation}>
                    <InputGroup 
                        type='text'
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder='Nombre del cliente'/>
                    <InputGroup
                        type='number'
                        name='dni'
                        value={this.state.dni}
                        onChange={this.handleChange}
                        placeholder='DNI del cliente'/>
                    <InputGroup
                        type='text'
                        name='email'
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder='Correo electrónico'/>
                    <InputGroup
                        type='text'
                        name='type'
                        value={this.state.type}
                        onChange={this.handleChange}
                        placeholder='Tipo de producto'/>
                    <InputGroup
                        type='text'
                        name='brand'
                        value={this.state.brand}
                        onChange={this.handleChange}
                        placeholder='Marca del producto'/>
                    <InputGroup
                        type='text'
                        name='model'
                        value={this.state.model}
                        onChange={this.handleChange}
                        placeholder='Modelo del producto'/>
                    <InputGroup
                        type='text'
                        name='problem'
                        value={this.state.problem}
                        onChange={this.handleChange}
                        placeholder='Falla inicial'/>
                    <InputGroup
                        type='submit'
                        value='Crear Orden'
                        placeholder='Crear'/>
                </form>
                <Button onClick={this.goBackHome}>Volver</Button>
            </div>
        )
    }

}

export default NewOrderForm