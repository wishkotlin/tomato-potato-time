// import { Button } from "antd";
import * as React from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Index from "./components/Index";
import Succcess from "./components/Success";
import Account from "./components/Account";
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
        {/* <Main /> */}
       
          <Route exact={true} path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/success" component={Succcess} />
          <Route path="/account" component={Account} />
        
      </Router>
    );
  }
}

export default App;
