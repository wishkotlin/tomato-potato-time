import React from "react";
import CollectionCreateForm from "../FogetPass/Fogetpass";
import { Button, Form, Icon, Input,message, } from "antd";
import {signIn,ownUser} from "../../utils/learnCloud";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionshow,actionhide } from "../../redux/actions";

interface loginState {
    account: any,
    password:any,
    visible: boolean,
    confirmLoading: boolean
  }
  
//第一个表单
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
      console.log(props)
      this.state = {
        account: "",
        password: "",
        visible: false,
        confirmLoading: false,
      }
      console.log("LoginForm 的 props",this.props)
    }

    handleSubmit = (e:any) => {
      e.preventDefault();
      console.log(this.props)
      this.props.form.validateFields((err:any, values:any) => {
        if (!err) {
           message.loading('登陆中..', 0)//登陆中
          let success = (user:any) => {
            console.log(user);
            this.props.history.push("/");
            // message.loading('登陆中..', 0)
            message.destroy()
            message.success('登录成功');
            // this.props.onSingin(user); //传值
          };
          let error = (error:any) => {
            if (error.code === 210) {
              message.warning("账户与密码不匹配");
            } else if (error.code === 219) {
              message.error("登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码");
            }
            console.log(error.code);
            if(error.code === -1){
              message.destroy()
              message.error('登陆失败，请检查网络后，稍后重试')
            }
            console.log(error.message);
          };
          console.log('Received values of form: ', values);
          signIn(values.account, values.password, success, error);
          // try {
          //   await axios.post("sign_in/user",{
          //     account: values.account,
          //     password: values.password,
          //     password_confirmation: values.rpassword
          //   })
          //   console.log("成功")
          //   this.props.history.push("/");
          // } catch (error) {
          //   console.log(error)
          //   alert("登录失败")
          //   // throw new Error()
          // }
          
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

    // handleOk = (e:any) => {
    //   this.ForgetPass(e)
    //   // this.setState({
    //   //   // ModalText: 'The modal will be closed after two seconds',
    //   //   confirmLoading: true,
    //   // });
    //   // setTimeout(() => {
    //   //   this.setState({
    //   //     visible: false,
    //   //     confirmLoading: false,
    //   //   });
    //   // }, 2000);
    // }

    // handleCancel = () => {
    //   console.log('Clicked cancel button');
    //   this.setState({
    //     visible: false,
    //   });
    // }

    showModal = (e:any) => {
      e.preventDefault();
      this.setState({
        visible: true,
      },() => {
        // let is =  this.props.statelogin
        this.props.actionshow()//调用 actions里面的 函数 修改 loginredux 里面的 state
        console.log("tempis",this.props)
      });
      // console.log(this.props)
      
    }

    // ForgetPass = (e:any) => {
    //   e.preventDefault();
    //   console.log(this.props)
    //   this.props.form.validateFields((err:any, values:any) => {
    //     if (!err) {

    //       let success = (success:any) => {
    //         console.log(success);
    //         // this.props.history.push("/");
    //         this.setState({
    //           visible: false,
    //           confirmLoading: false,
    //         });
    //         message.success('密码重置邮件发送成功，请到邮箱查收');
    //         // this.props.onSingin(user); //传值
    //       };
    //       let error = (error:any) => {
    //         // if (error.code === 210) {
    //         //   message.warning("账户与密码不匹配");
    //         // } else if (error.code === 219) {
    //         //   message.error("登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码");
    //         // }
    //         message.warning("密码重置失败，请稍后重试");
    //         console.log(error.code);
    //         console.log(error.message);
    //       };
    //       this.setState({
    //           // ModalText: 'The modal will be closed after two seconds',
    //           confirmLoading: true,
    //       });
    //       console.log(values)
    //       // message.success("密码重置邮件发送成功，请到邮箱查收")
    //       sendPasswordResetEmail(values.email,success,error)
    //       //   setTimeout(() => {
    //       //   this.setState({
    //       //     visible: false,
    //       //     confirmLoading: false,
    //       //   });
    //       // }, 2000);
    //     }
    //   })
    // }

    componentDidMount(){
      let tempuser = ownUser();
      console.log("登录凭证",tempuser);
      console.log(JSON.stringify(tempuser))
      if(JSON.stringify(tempuser) !== JSON.stringify({})){
        this.props.history.push("/")
      }
    }



   

  
    render() {
      const { getFieldDecorator } = this.props.form;
      // const { visible, confirmLoading, } = this.state;

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
            Or <a href="" onClick={this.signup}>没有账号，现在注册!</a>
            <a onClick={this.showModal} className="login-form-forgot" href="">忘记密码</a>
            {/* <CollectionCreateForm showModal={this.state.visible} /> */}
            <CollectionCreateForm />
            {/* { this.props.statelogin.isshow.toString() } */}
           
              
            {/* <Modal
            title="重置密码"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
            cancelText="取消"
            okText="发送"
          >
            <Form onSubmit={this.ForgetPass} className="login-form">
            <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '输入的不是邮箱!',
              }, {
                required: true, message: '请输入你的邮箱!',
              }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
            )}
          </Form.Item>
            </Form>
          </Modal> */}
          </Form.Item>
        </Form>
      );
    }
  }

  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })<any>(withRouter(NormalLoginForm));
  //withRouter 获取 history


  const mapStateToProps = (state:any,ownProps:any) => ({
    // return {
    //   counter: state.counter
    // }
    statelogin: state,
    ...ownProps
  })
  
  const mapDispatchToProps = { 
    actionshow,
    actionhide
   }

export default connect(mapStateToProps,mapDispatchToProps)(WrappedNormalLoginForm)