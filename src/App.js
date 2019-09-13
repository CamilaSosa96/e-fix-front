import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
        <Route exact path="/" component={MainScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
    </Router>
  );
}

export default App;
