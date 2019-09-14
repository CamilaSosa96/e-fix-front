import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import NewOrder from "./components/NewOrder";
import Message from './screens/Message';
import ResultScreen from "./components/ResultsScreen";
import EditScreen from "./components/EditForm"
import ApprovalScreen from './screens/ApprovalScreen'

function App() {
  return (
    <Router>
        <Route exact path="/" component={MainScreen} />
        <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/newOrder" component={NewOrder} />
        <Route exact path="/message" component={Message} />
        <Route exact path="/searchResults" component={ResultScreen} />
        <Route exact path="/editOrder" component={EditScreen} />
        <Route exact path="/approval/1" component={ApprovalScreen}/> 
    </Router>
  );
}

export default App;
