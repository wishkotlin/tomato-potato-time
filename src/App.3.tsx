// import { Button } from "antd";
import * as React from "react";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";
import Login from "./components/Login";
import Singup from "./components/Signup";
import Index from "./components/Index";

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
        <div>
          <Route exact={true} path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/singup" component={Singup} />
        </div>
      </Router>
    );
  }
}

export default App;
