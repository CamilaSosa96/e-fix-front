import React from 'react';
import '../styles/LoginScreen.css'

class LoginScreen extends React.Component {

    constructor(props){
        super(props);
        this.doParentToggleFromChild = this.doParentToggleFromChild.bind(this);
    }

    doParentToggleFromChild(){
        this.props.login();
    }

    render () {
        return (
            <div className="loginscreen" >
                <img src="../efixlogo.png" className="logo" alt="E-FIX"/>
                <form onSubmit={this.doParentToggleFromChild} className="form">
                 <label> Usuario: <input type="text" name="name" /> </label>
                   <label> Contraseña: <input type="password" name="name" /> </label> 
                   <input type='submit' value='Ingresar'></input>
                </form>
            </div>         
        )
    } 
     
}

export default LoginScreen;