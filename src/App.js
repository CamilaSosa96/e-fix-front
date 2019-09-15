import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import RedirScreen from "./screens/RedirScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

function App() {
  return (
    <Router>
        <Route exact path="/" component={RedirScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/home" component={HomeScreen} />
    </Router>
  );
}

export default App;
