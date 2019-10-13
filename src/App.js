import React from 'react'
import axios from 'axios'
import RedirScreen from './screens/RedirScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewOrderForm from './screens/NewOrderForm'
import OrdersScreen from './screens/OrdersScreen'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import ApprovalScreen from './screens/ApprovalScreen'

function App() {
  axios.defaults.withCredentials = true
  return (
    <Router>
        <Route exact path='/' component={RedirScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/home' component={HomeScreen} />
        <Route exact path='/createOrder' component={NewOrderForm} />
        <Route path='/orders/:searchString' render={props => <OrdersScreen key={Date.now()} {...props} />}/>
        <Route exact path='/orders' component={OrdersScreen} />
        <Route path='/budget/:id/:dni' component={ApprovalScreen}/>
    </Router>
  );
}

export default App;
