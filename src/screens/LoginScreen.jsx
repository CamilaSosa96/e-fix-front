import React from 'react'
import { FormGroup, InputGroup} from "@blueprintjs/core";
import {Image} from 'react-bootstrap'
import '../styles/LoginScreen.css'
import {Redirect} from 'react-router-dom'

class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isLoggedIn: false,
            user: "",
            pass: "",
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleLogin(){
        //ACÁ DEBERÍA HACER LA LLAMADA AL BACK Y VERIFICAR QUE ES UN USUARIO VÁLIDO
        if(this.state.user === "camila" && this.state.pass === "1234"){
            this.setState({isLoggedIn: true}) 
        }
        
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }

    render () {
        const redirectToReferrer = this.state.isLoggedIn;
        if (redirectToReferrer === true) {
        
        return  (
                <Redirect to="/home"/>
            )
        } else {

        return (
            <div>
                <form onSubmit={this.handleLogin}>
                <FormGroup style={{textAlign: "center", marginTop: '150px'}}> 
                    <Image style={{width:'35%'}} src="../efixlogo.png"></Image>
                    <InputGroup 
                        style={{marginTop: '20px'}}
                        name='user' 
                        type='text'
                        placeholder='Usuario'
                        onChange={this.handleChange}/>
                    <InputGroup 
                        style={{marginTop: '10px'}}
                        name='pass'
                        type='password' 
                        placeholder='Contraseña'
                        onChange={this.handleChange}/>              
                    <InputGroup
                        style={{marginTop: '10px'}}
                        type='submit'
                        value='Ingresar'/>           
                </FormGroup>
                </form>
            </div>      
        )}
    } 
     
}

export default LoginScreen;