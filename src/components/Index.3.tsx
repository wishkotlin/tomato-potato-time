import React, { Component } from "react";
import { Button, Form, Icon, Input } from "antd";
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
          this.props.history.push("/success");
        }
      });
    }


    signup = (e:any) =>{
        e.preventDefault();
        this.props.history.push("/signup");
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <a href="" onClick={this.signup}>现在注册!</a>
          </Form.Item>
        </Form>
      );
    }
  }

  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })<any>(withRouter(NormalLoginForm));
  //withRouter 获取 history


class Index extends Component<IProps> {
//   login = (): any => {
//     // console.log("点击了");
//     console.log(this.props);
//     this.props.history.push("/succcess");
//     // return(
//     // // <Router>
//     // // <Link to="/login">login</Link>
//     // // </Router>
//     // // <Login />
//     // )
//   };
  render() {
    return (
      <div className="login">
        <p>Hey番茄土豆登录</p>
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
