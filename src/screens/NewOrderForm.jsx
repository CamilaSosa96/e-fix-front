import React from 'react'
import { Redirect } from 'react-router-dom'
import {saveOrder, isAuthored} from '../efixService'
import NavigationBar from '../components/NavigationBar'
import {Button, InputGroup, Alert, Card, Icon, Divider} from '@blueprintjs/core'

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
        isAuthored((error, _response) => {
            if(error){this.setState({goLogin: true})}
        })
    }

    handleOrderCreation(event){
        if(this.isValidOrder()){
            saveOrder(this.state.name, this.state.dni, this.state.email, this.state.type,
                      this.state.brand, this.state.model, this.state.problem, (_err, _response) => {
                        this.setState({onAlertClick: this.goBackHome, 
                                       alertMSJ: '¡Orden creada exitosamente!', 
                                       alert: true})
                      })
        }  else {
            this.setState({onAlertClick: this.closeAlert,
                           alertMSJ: 'Por favor, complete todos los campos.', 
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
                            confirmButtonText='ACEPTAR'
                            icon='warning-sign'
                            intent='warning'
                            onClose={this.state.onAlertClick}>
                            {this.state.alertMSJ}
                        </Alert>}
                    {this.state.goHome && <Redirect to='/home'/>}
                    <NavigationBar/>
                </div>
                <div style={{width: '500px', margin: '0 auto', marginTop: '20px'}}>
                    <Card>
                    <p style={{fontSize: '27px', textAlign: 'center'}}>
                        <b>Crear nueva orden de reparación</b>
                    </p>
                    <Divider/>
                    <form onSubmit={this.handleOrderCreation}>
                        <div style={{display: 'inline-block', 
                                     width: '200px', 
                                     marginTop: '15px', 
                                     textAlign: 'center'}}>
                            <div style={{marginBottom: '20px'}}>
                                <Icon  icon='person' iconSize='120' style={{color: '#5B1790'}}/>
                            </div>
                            <div style={{marginBottom: '17px', marginTop: '35px'}}>
                                <Icon icon='desktop' iconSize='150' style={{color: '#5B1790'}}/>
                            </div>
                            <Button style={{width: '150px', color: 'white', backgroundColor: '#39A1D2'}}
                                    icon={<Icon style={{color: 'white'}} icon='undo' iconSize='15'/>}
                                    minimal='true'
                                    onClick={this.goBackHome}>
                                <b>VOLVER</b>
                            </Button>
                        </div>
                        <div style={{display: 'inline-block', width: '225px'}}>
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='text'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Nombre del cliente'/>
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='text'
                            name='dni'
                            value={this.state.dni}
                            onChange={this.handleChange}
                            maxLength='10'
                            placeholder='DNI del cliente'/>
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Correo electrónico'/>
                        <InputGroup
                            style={{marginBottom: '10px', marginTop: '30px'}}
                            type='text'
                            name='type'
                            value={this.state.type}
                            onChange={this.handleChange}
                            maxLength='30'
                            placeholder='Tipo de producto'/>
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='text'
                            name='brand'
                            value={this.state.brand}
                            onChange={this.handleChange}
                            maxLength='15'
                            placeholder='Marca del producto'/>                      
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='text'
                            name='model'
                            value={this.state.model}
                            onChange={this.handleChange}
                            maxLength='20'
                            placeholder='Modelo del producto'/>
                        <InputGroup
                            style={{marginBottom: '10px'}}
                            type='text'
                            name='problem'
                            value={this.state.problem}
                            onChange={this.handleChange}
                            maxLength='20'
                            placeholder='Falla inicial del producto'/>
                        <InputGroup
                            style={{marginTop: '10px', 
                                    marginBottom: '10px', 
                                    color:'white',
                                    backgroundColor: '#3DA817',
                                    fontWeight:'bolder'}}
                            type='submit'
                            value='CREAR ORDEN'
                            placeholder='Crear' />
                        </div>
                    </form>
                    </Card>
                </div>
            </div>
        )
    }

}

export default NewOrderForm