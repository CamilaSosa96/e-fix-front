import React from 'react'
import { FormGroup, InputGroup, Alert} from "@blueprintjs/core";
import {Image} from 'react-bootstrap'
import '../styles/LoginScreen.css'
import {Redirect} from 'react-router-dom'
import {validateUser} from '../efixService'

class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            alert: false,
            msg: "",
            user: "",
            pass: "",
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleLogin(event){
        validateUser(this.state.user, this.state.pass, (error, response) => {
            if(error){
                console.log(error.staus)
                this.setState({alert: true})
            } else {
                this.setState({isLoggedIn: true})
            }
        })
        event.preventDefault();
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
        event.preventDefault();
    }

    render () {  
        return (
            <div>
                {this.state.isLoggedIn && <Redirect to="/home"/>}
                <Alert isOpen={this.state.alert}
                    onClose={()=>{this.setState({user: "", pass: "", alert: false})}}>
                    La combinación de usuario y contraseña es incorrecta. 
                </Alert>
                <form onSubmit={this.handleLogin}>
                    <FormGroup style={{textAlign: "center", marginTop: '150px'}}> 
                        <Image style={{width:'35%', marginTop: '-50px'}} src="../efixlogo.png"></Image>
                        <h2>¡Bienvenido a E-FIX! Ingrese para continuar:</h2>
                        <InputGroup 
                            style={{marginTop: '10px', maxWidth: '200px'}}
                            name='user' 
                            type='text'
                            placeholder='Usuario'
                            onChange={this.handleChange}/>
                        <InputGroup 
                            style={{marginTop: '10px', maxWidth: '200px'}}
                            name='pass'
                            type='password' 
                            placeholder='Contraseña'
                            onChange={this.handleChange}/>              
                        <InputGroup
                            style={{marginTop: '10px', maxWidth: '200px'}}
                            type='submit'
                            value='Ingresar'/>           
                    </FormGroup>
                </form>
            </div>      
        )
    }  
}

export default LoginScreen;