import React, { Component } from "react";
import { Button } from "antd";
import "../App.scss";
// import Login from "./Login"
import { RouteComponentProps, withRouter } from "react-router-dom";
// @withRouter

interface IProps extends RouteComponentProps<any> {
//   title: string;
  history: any;
}

class Index extends Component<IProps> {
  login = (): any => {
    // console.log("点击了");
    console.log(this.props);
    this.props.history.push("/login");
    // return(
    // // <Router>
    // // <Link to="/login">login</Link>
    // // </Router>
    // // <Login />
    // )
  };
  render() {
    return (
      <div className="login">
        <p>index</p>
        <Button
          type="primary"
          onClick={() => {
            // console.log("点击了");
            this.login();
          }}
        >
          登录
        </Button>
      </div>
    );
  }
}

export default withRouter<IProps>(Index);
