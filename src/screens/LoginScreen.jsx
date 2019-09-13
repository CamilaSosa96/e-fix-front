import React from 'react';
import '../styles/LoginScreen.css'
import {withRouter} from 'react-router-dom';

class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.goHome = this.goHome.bind(this);
    }

    goHome(){
        this.nextPath("/home");
    }

    nextPath(path) {
        this.props.history.push(path);
      }

    render () {
        return (
            <div className="loginscreen" >
                <img src="../efixlogo.png" className="logo" alt="E-FIX"/>
                <form onSubmit={this.goHome} className="form">
                 <label> Usuario: <input type="text" name="name" /> </label>
                   <label> Contraseña: <input type="password" name="name" /> </label> 
                   <input type='submit' value='Ingresar'></input>
                </form>
            </div>         
        )
    } 
     
}

export default withRouter(LoginScreen);