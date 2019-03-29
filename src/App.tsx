// import { Button } from "antd";
import * as React from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";

import "./App.scss";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Index from "./components/home/home";
import Succcess from "./components/success/Success";
import Account from "./components/tests/Account";
import Todos from "./components/todos/Todos";
import NoMatch from "./components/NoMatch/NoMatch"
// function Main() {
//   return (
//     <ul>
//       <li>
//         <Link to="/">Index</Link>
//       </li>
//       <li>
//         <Link to="/login">login</Link>
//       </li>
//       <li>
//         <Link to="/singup">singup</Link>
//       </li>
//     </ul>
//   );
// }

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          {/* <Main /> */}
        
            <Route exact={true} path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/success" component={Succcess} />
            <Route path="/account" component={Account} />
            <Route path="/todos" component={Todos} />
            <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
