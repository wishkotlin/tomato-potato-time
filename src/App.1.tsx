// import { Button } from "antd";
import * as React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.scss";

// import logo from './logo.svg';
function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact={true} component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}
class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <AppRouter />
      </div>
    );
  }
}

export default App;
