import React, { Component } from 'react'
import { Button, Form, Icon, Input,message } from "antd";
import { withRouter } from "react-router-dom";
// import axios from '../../utils/Axios';
import "../../App.scss";
import { signUp,ownUser } from "../../utils/learnCloud"

interface MyProps {
  form:any,
  history:any,
  onSingup:any
}

interface MyState {
  account: any,
  password: any,
  rpassword: any,
  email: any

}

class NormalLoginForm extends React.Component<MyProps, MyState> {
  
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
      rpassword: "",
      email: ""
    }
  }
  handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(this.props)
    this.props.form.validateFields(async (err:any, values:any) => {
      if (!err) {
        message.loading('注册中..', 0)//注册中
        let success = (user:any) => {
          console.log(user);
          message.destroy()
          message.success('注册成功');
          // this.props.onSingup(user);
          this.props.history.push("/");//注册成功后 跳转到 首页
        };
      let error = (error:any) => {
         console.log(error.code)
        if(error.code === 203){
          message.destroy()
          message.error('注册失败，此电子邮箱已经被占用')
        }else{
          message.destroy()
          // alert(error.message);
          message.error('注册失败，请检查网络后，稍后重试')
        }
          console.log(error.message);
          
        };
        signUp(values.email, values.account, values.password, success, error);
        // console.log('Received values of form: ', values);
        // try {
        //   await axios.post("sign_up/user",{
        //     account: values.account,
        //     password: values.password,
        //     password_confirmation: values.rpassword
        //   })
        //   console.log("成功")
        // } catch (error) {
        //   console.log(error)
        //   alert("注册失败")
        //   // throw new Error()
        // }
        // this.props.history.push("/");
      }
    });
  }


  signup = (e:any) =>{
      e.preventDefault();
      this.props.history.push("/login");
  }

  // onChangeUserName = (e:any) => {
  //   // this.setState({ account: e.target.value });
  //   this.props.form.setFieldsValue({ account: e.target.value })
  // }
  account = (e:any) => {
    e.persist()
    // console.log(e);
    // console.log(e.target.value)
    // this.props.form.setFieldsValue({ account: e.target.value });
    this.setState({ account: e.target.value },()=>{
      // console.log("修改后的state.account",this.state.account)
    });
  }

  password = (e:any) =>{
    e.persist()
    // console.log(e);
    // console.log(e.target.value)
    // this.props.form.setFieldsValue({ account: e.target.value });
    this.setState({ password: e.target.value },()=>{
      // console.log("修改后的state.password",this.state.password)
    });
  }

  rpassword = (e:any) =>{
    e.persist()
    // console.log(e);
    console.log(e.target.value)
    // this.props.form.setFieldsValue({ account: e.target.value });
    this.setState({ rpassword: e.target.value },()=>{
      console.log("修改后的state.rpassword",this.state.rpassword)
    });
  }

  email = (e:any) => {
    e.persist()
    // console.log(e);
    console.log(e.target.value)
    // this.props.form.setFieldsValue({ account: e.target.value });
    this.setState({ email: e.target.value },()=>{
      console.log("修改后的state.rpassword",this.state.email)
    });
  }

  compareToFirstPassword = (rule:any, value:any, callback:any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入的不同，请重新输入!');
    } else {
      callback();
    }
  }


  componentDidMount(){
    let tempuser = ownUser();
    // console.log("登录凭证",tempuser);
    // console.log(JSON.stringify(tempuser))
    if(JSON.stringify(tempuser) !== JSON.stringify({})){
      this.props.history.push("/")
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    // const {account} = this.state
    // const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('account', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input onChange={this.account} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '输入的内容不是邮箱!',
            }, {
              required: true, message: '请输入邮箱!',
            }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
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
          {getFieldDecorator('rpassword', {
            rules: [{ required: true, message: '请输入密码!' },{
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input.Password onChange={this.rpassword} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
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
            注册
          </Button>
          Or <a href="" onClick={this.signup}>现在登录!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })<any>(withRouter(NormalLoginForm));
//withRouter 获取 history




export default class Singup extends Component {
  // constructor(props: any){
  //   super(props)
  //   this.state = {
  //     account: "",
  //     password: "",
  //     rpassword: ""
  //   }
  // }
  render() {
    return (
      <div className="signup">
      <p>Hey番茄土豆注册</p>
        <WrappedNormalLoginForm />
      </div>
    )
  }
}
