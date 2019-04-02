import React from "react";
import { Form, Icon, Input,message,Modal } from "antd";
import {sendPasswordResetEmail} from "../../utils/learnCloud";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionshow,actionhide } from "../../redux/actions";
  
  //第二个表单
  class form_in_modal extends React.Component<any,any> {

    constructor(props: any){
      super(props)
      
      this.state = {
        visible: false,
        confirmLoading: false,
      }
      // console.log("Fogetpass 的 props",this.props)
    }


    ForgetPass = (e:any) => {
      e.preventDefault();
      console.log(this.props)
      this.props.form.validateFields((err:any, values:any) => {
        if (!err) {

          let success = (success:any) => {
            console.log(success);
            // this.props.history.push("/");
            this.setState({
              visible: false,
              confirmLoading: false,
            });
            this.props.actionshow()//调用 actions里面的 函数 修改 loginredux 里面的 state
            message.success('密码重置邮件发送成功，请到邮箱查收');
            // this.props.onSingin(user); //传值
          };
          let error = (error:any) => {
            // if (error.code === 210) {
            //   message.warning("账户与密码不匹配");
            // } else if (error.code === 219) {
            //   message.error("登录失败次数超过限制，请稍候再试，或者通过忘记密码重设密码");
            // }
            message.warning("密码重置失败，请稍后重试");
            console.log(error.code);
            console.log(error.message);
          };
          this.setState({
              // ModalText: 'The modal will be closed after two seconds',
              confirmLoading: true,
          });
          console.log(values)
          // message.success("密码重置邮件发送成功，请到邮箱查收")
          sendPasswordResetEmail(values.email,success,error)
          
          //   setTimeout(() => {
          //   this.setState({
          //     visible: false,
          //     confirmLoading: false,
          //   });
          // }, 2000);
        }
      })
    }

    handleOk = (e:any) => {

      this.ForgetPass(e)

      console.log(e)
      // this.setState({
      //   // ModalText: 'The modal will be closed after two seconds',
      //   confirmLoading: true,
      // });
      // setTimeout(() => {
      //   this.setState({
      //     visible: false,
      //     confirmLoading: false,
      //   });
      // }, 2000);
    }

    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
      this.props.actionshow()//调用 actions里面的 函数 修改 loginredux 里面的 state

    }

    componentDidMount(){
      // console.log(this.props.showModal)
      // this.setState(  () => () )

    //   let temppass = this.props.actionshow().showtop
    //   console.log("temppass",temppass)
    //   this.setState( () => ({
    //     visible: temppass
    //   }) )

    }
    
    componentWillReceiveProps(nextProps:any){
      // console.log(nextProps)
      // console.log(this.props)
      // let tempvisible = this.props.actionshow(true).payload
      // this.setState( () => ({
      //   visible: tempvisible
      // }) )
    }



    render() {
      // const {visible, onCancel, onCreate, form,} = this.props;
      // const { getFieldDecorator } = form;
      const { getFieldDecorator } = this.props.form;
      const { confirmLoading, } = this.state;
      // let visible = this.props.showModal
      // console.log(this.props.showModal,visible)
      
      
      let visible = this.props.statePass.isshow
      // console.log("传值",this.props.showModal,"非传值",visible)
      return (

         <Modal
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
          </Modal>
        // <Modal
        //   visible={visible}
        //   title="Create a new collection"
        //   okText="Create"
        //   onCancel={onCancel}
        //   onOk={onCreate}
        // >
        //   <Form layout="vertical">
        //     <Form.Item label="Title">
        //       {getFieldDecorator('title', {
        //         rules: [{ required: true, message: 'Please input the title of collection!' }],
        //       })(
        //         <Input />
        //       )}
        //     </Form.Item>
        //     <Form.Item label="Description">
        //       {getFieldDecorator('description')(<Input type="textarea" />)}
        //     </Form.Item>
        //     {/* <Form.Item className="collection-create-form_last-form-item">
        //       {getFieldDecorator('modifier', {
        //         initialValue: 'public',
        //       })(
        //         <Radio.Group>
        //           <Radio value="public">Public</Radio>
        //           <Radio value="private">Private</Radio>
        //         </Radio.Group>
        //       )}
        //     </Form.Item> */}
        //   </Form>
        // </Modal>
      );
    }
  }
  const CollectionCreateForm = Form.create({ name: 'form_in_modal' })<any>(withRouter(form_in_modal));


  const mapStateToProps = (state:any,ownProps:any) => ({
    // return {
    //   counter: state.counter
    // }
    statePass: state,
    ...ownProps
  })
  
  const mapDispatchToProps = { 
    actionshow,
    actionhide
   }

  export default connect(mapStateToProps,mapDispatchToProps)(CollectionCreateForm)
