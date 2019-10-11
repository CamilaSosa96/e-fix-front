import React from 'react'
import { Redirect } from 'react-router-dom'
import {saveOrder, isAuthored} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import {Button, InputGroup, Alert, Card, Icon} from '@blueprintjs/core'

class NewOrderForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            dni: '',
            email: '',
            type: '',
            brand: '',
            model: '',
            problem: '',
            alertMSJ: '',
            alert: false,
            goHome: false,
            goLogin: false,
            onAlertClick: this.goBackHome
        }
        this.handleOrderCreation = this.handleOrderCreation.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.isValidOrder = this.isValidOrder.bind(this)
        this.goBackHome = this.goBackHome.bind(this)
        this.closeAlert = this.closeAlert.bind(this)
    }

    componentDidMount(){
        isAuthored((error, response) => {
            if(error){this.setState({goLogin: true})}
        })
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
            this.state.name !== '' && this.state.dni !== '' &&
            this.state.email !== '' && this.state.type !== '' &&
            this.state.brand !== '' && this.state.model !== '' &&
            this.state.problem !== ''
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
                <div>
                    {this.state.goLogin && <Redirect to='/login'/>}
                    {this.state.alert && 
                        <Alert
                            isOpen={this.state.alert} 
                            onClose={this.state.onAlertClick}>
                            {this.state.alertMSJ}
                        </Alert>}
                    {this.state.goHome && <Redirect to='/home'/>}
                    <NavigationBar/>
                </div>
                <div style={{width: '500px', margin: '0 auto', marginTop: '20px'}}>
                    <Card>
                    <h1>Crear nueva orden de reparación</h1>
                    <form onSubmit={this.handleOrderCreation}>
                        <div style={{display: 'inline-block'}}>
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='text'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Nombre del cliente'/>
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='number'
                            name='dni'
                            value={this.state.dni}
                            onChange={this.handleChange}
                            min='0'
                            max='9999999999'
                            placeholder='DNI del cliente'/>
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Correo electrónico'/>
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='text'
                            name='type'
                            value={this.state.type}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Tipo de producto'/>
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='text'
                            name='brand'
                            value={this.state.brand}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Marca del producto'/>                      
                        <InputGroup
                            style={{width: '200px', marginBottom: '10px'}}
                            type='text'
                            name='model'
                            value={this.state.model}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Modelo del producto'/>
                        </div>
                        <div style={{display: 'inline-block', marginLeft: '20px'}}>
                        <textarea
                            style={{width: '200px', height: '187px', marginBottom: '10px', resize: 'none'}}
                            type='text'
                            name='problem'
                            value={this.state.problem}
                            onChange={this.handleChange}
                            placeholder='Falla inicial'
                            maxLength='30'/>
                        <InputGroup
                            style={{width: '200px', backgroundColor: '#C4FAD1'}}
                            type='submit'
                            value='Crear Orden'
                            placeholder='Crear' />
                        </div>
                    </form>
                    <Button
                        style={{marginTop: '30px', backgroundColor: '#BF83DA'}}
                        icon={<Icon icon='undo' iconSize='15'/>}
                        onClick={this.goBackHome}>
                        Volver
                    </Button>
                    </Card>
                </div>
            </div>
        )
    }

}

export default NewOrderForm