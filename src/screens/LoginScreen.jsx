import React from 'react'
import '../styles/LoginScreen.css'
import {withRouter} from 'react-router-dom'

class LoginScreen extends React.Component {

    constructor(props){
        super(props)
        this.loginHandler = this.loginHandler.bind(this)
    }

    loginHandler (){
        this.nextPath('/home')
    }

    nextPath(path) {
        this.props.history.push(path)
      }

    render () {
        return (
            <body>
            <div className="loginscreen">
                <img src="../efixlogo.png" className="logo" alt="E-FIX"/>
                <form onSubmit={this.loginHandler} className="form"> <br/><br/>
                    <label className="elemLS"><input type="text" name="name" placeholder="Usuario"/> </label>  <br/><br/>
                    <label className="elemLS"><input type="password" name="name" placeholder="Contraseña"/> </label>  <br/><br/>
                    <input className="elemLS" type='submit' value='Ingresar'></input>
                </form>
            </div>   
            </body>      
        )
    } 
     
}

export default withRouter(LoginScreen);