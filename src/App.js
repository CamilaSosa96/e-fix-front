import React from "react"
import RedirScreen from "./screens/RedirScreen"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import NewOrderForm from './screens/NewOrderForm'
import OrdersScreen from './screens/OrdersScreen'
import { BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (
    <Router>
        <Route exact path="/" component={RedirScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/createOrder" component={NewOrderForm} />
        <Route path="/orders/:searchString" render={props => <OrdersScreen key={Date.now()} {...props} />}/>
        <Route exact path="/orders" component={OrdersScreen} />
    </Router>
  );
}

export default App;
