import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Registered from "./components/Registered";

function App() {
  return (
    <div className="container">
      <h2 className="display-2 text-center">Auth with React and Firebase</h2>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/registered" component={Registered}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
