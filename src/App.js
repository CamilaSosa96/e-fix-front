import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ApprovalScreen from './screens/ApprovalScreen'
import ResultScreen from "./components/ResultsScreen";
import ResultScreen2 from "./components/ResultsScreen2";

function App() {
  return (
    <Router>
        <Route exact path="/" component={MainScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/results" component={ResultScreen} />
        <Route exact path="/resuits" component={ResultScreen2} />
        <Route exact path="/approval/1" component={ApprovalScreen}/> 
    </Router>
  );
}

export default App;
