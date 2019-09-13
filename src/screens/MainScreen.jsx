import React from 'react';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';

class MainScreen extends React.Component {

    constructor(){
        super();
        this.state = {
            isLoggedIn: false   
        };
        this.enableLogin = this.enableLogin.bind(this);
    }

    enableLogin(){  
        this.setState({isLoggedIn: true})
    }

    render() {
        return (
            <div>
                {this.state.isLoggedIn && <HomeScreen/>}
                {!this.state.isLoggedIn && <LoginScreen login={this.enableLogin}/>}
            </div>
        )
    }
}

export default MainScreen;