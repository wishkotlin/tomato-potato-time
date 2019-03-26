
import React, { Component } from "react";
import { Button, Form, Icon, Input } from "antd";
import "../App.scss";
// import Login from "./Login"
import { RouteComponentProps, withRouter } from "react-router-dom";
import axios from "../utils/Axios"
// @withRouter

interface IProps extends RouteComponentProps<any> {
//   title: string;
  history: any;
}

interface loginState {
  account: any,
  password:any
}


class NormalLoginForm extends React.Component<any,loginState> {
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

    constructor(props: any){
      super(props)
      this.state = {
        account: "",
        password: "",
      }
    }

    handleSubmit = (e:any) => {
      e.preventDefault();
      console.log(this.props)
      this.props.form.validateFields(async (err:any, values:any) => {
        if (!err) {
          console.log('Received values of form: ', values);
          try {
            await axios.post("sign_in/user",{
              account: values.account,
              password: values.password,
              password_confirmation: values.rpassword
            })
            console.log("成功")
            this.props.history.push("/");
          } catch (error) {
            console.log(error)
            alert("登录失败")
            // throw new Error()
          }
          
        }
      });
    }


    signup = (e:any) =>{
        e.preventDefault();
        this.props.history.push("/signup");
    }

    account = (e:any) => {
      e.persist()
      // console.log(e);
      console.log(e.target.value)
      // this.props.form.setFieldsValue({ account: e.target.value });
      this.setState({ account: e.target.value },()=>{
        console.log("修改后的state.account",this.state.account)
      });
    }

    password = (e:any) =>{
      e.persist()
      // console.log(e);
      console.log(e.target.value)
      // this.props.form.setFieldsValue({ account: e.target.value });
      this.setState({ password: e.target.value },()=>{
        console.log("修改后的state.password",this.state.password)
      });
    }


  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('account', {
              rules: [{ required: true, message: '请输入用户名！' }],
            })(
              <Input onChange={this.account} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input.Password onChange={this.password} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
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


class Login extends Component<IProps> {
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

export default withRouter<IProps>(Login);
