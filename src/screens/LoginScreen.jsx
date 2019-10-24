import React from 'react'
import {Redirect} from 'react-router-dom'
import {validateUser, isAuthored} from '../efixService'
import { FormGroup, InputGroup, Alert} from '@blueprintjs/core'
import { Colors } from '@blueprintjs/core'
import {Image} from 'react-bootstrap'
import '../styles/LoginScreen.css'

class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            alert: false,
            msg: '',
            user: '',
            pass: '',
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        isAuthored((error, _response) => {
            if(!error){this.setState({isLoggedIn: true})}
        })
    }

    handleLogin(event){
        validateUser(this.state.user, this.state.pass, (error) => {
            if(error){
                error.message === 'Network Error' ?
                    this.setState({msg: 'No se ha podido conectar al back-end', alert: true}) :
                    this.setState({msg: 'El usuario y/o contraseña son incorrectos', alert: true})
            } else { 
                this.setState({isLoggedIn: true})
            }
        })
        event.preventDefault()
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault()
    }

    render () {  
        return (
            <div>
                {this.state.isLoggedIn && <Redirect to='/home'/>}
                <Alert isOpen={this.state.alert}
                    onClose={() => {this.setState({user: '', pass: '', alert: false})}}>
                    {this.state.msg}
                </Alert>
                <form onSubmit={this.handleLogin}>
                    <FormGroup style={{textAlign: 'center', marginTop: '150px'}}> 
                        <Image style={{width:'350px', marginTop: '-50px'}} src='../efixlogo.png'/>
                        <h2>Gestor de Órdenes de Reparación</h2>
                        <InputGroup 
                            style={{marginTop: '10px', maxWidth: '200px'}}
                            name='user' 
                            type='text'
                            placeholder='Usuario'
                            maxLength='20'
                            onChange={this.handleChange}/>
                        <InputGroup 
                            style={{marginTop: '10px', maxWidth: '200px'}}
                            name='pass'
                            type='password' 
                            placeholder='Contraseña'
                            maxLength='20'
                            onChange={this.handleChange}/>              
                        <InputGroup
                            style={{marginTop: '10px', 
                                    maxWidth: '200px', 
                                    backgroundColor: Colors.VIOLET1, 
                                    fontWeight: 'bold',
                                    color: Colors.WHITE}}
                            type='submit'
                            value='INGRESAR'/>           
                    </FormGroup>
                </form>
            </div>      
        )
    }  
}

export default LoginScreen
