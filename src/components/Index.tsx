import React, { Component } from 'react'
import { Spin,Button } from 'antd';
import { withRouter } from "react-router-dom";
import "./index.scss";
// import Login from "./Login";
class Index extends Component<any,any> {
  indexlogin = () => {
    this.props.history.push("/login")
  }
  indexsignup = () => {
    this.props.history.push("/signup")
  }
  render() {
    return (
      <div className="index">
      <p>欢迎使用Hey番茄土豆</p>
      <Spin size="large" />
      <div>
        <Button onClick={this.indexlogin} type="primary" className="indexlogin">登录</Button>
        <Button onClick={this.indexsignup} type="primary" className="indexsignup">注册</Button>
      </div>
      
        {/* <Login /> */}
      </div>
    )
  }
}

export default withRouter<any>(Index)
