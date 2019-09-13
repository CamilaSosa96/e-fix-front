import React from 'react'
import TopBar from '../components/TopBar.jsx';
import '../styles/HomeScreen.css'
import {withRouter} from 'react-router-dom';
import OrderScreen from './OrderScreen.jsx';

class HomeScreen extends React.Component {

    nextPath(path) {
        this.props.history.push(path);
      }

    render(){
        return (
            <div>
            <TopBar></TopBar>
            <OrderScreen className="order"></OrderScreen>
            </div>
        )
    }
}

export default withRouter(HomeScreen)