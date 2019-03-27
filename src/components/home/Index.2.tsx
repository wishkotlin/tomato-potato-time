import React, { Component } from "react";
import { Button, Form, Icon, Input, Checkbox } from "antd";
import "../App.scss";
// import Login from "./Login"
import { RouteComponentProps, withRouter } from "react-router-dom";
// @withRouter

interface IProps extends RouteComponentProps<any> {
//   title: string;
  history: any;
}


class NormalLoginForm extends React.Component<any> {
    // login = (): any => {
    //     // console.log("点击了");
    //     console.log(this.props);
    //     // this.props.history.push("/login");
    //     // return(
    //     // // <Router>
    //     // // <Link to="/login">login</Link>
    //     // // </Router>
    //     // // <Login />
    //     // )
    //   };

    handleSubmit = (e:any) => {
      e.preventDefault();
      console.log(this.props)
      this.props.form.validateFields((err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.props.history.push("/login");
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      );
    }
  }

  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })<any>(withRouter(NormalLoginForm));
  


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
        <WrappedNormalLoginForm />
        {/* <Button
          type="primary"
          onClick={() => {
            // console.log("点击了");
            this.login();
          }}
        >
          登录
        </Button> */}
      </div>
    );
  }
}

export default withRouter<IProps>(Index);
