
import React, { Component } from "react";
import "../../App.scss";
// import Login from "./Login"
import { RouteComponentProps, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actionshow,actionhide } from "../../redux/actions";
import WrappedNormalLoginForm from "../LoginForm/LoginForm"
import logo from "../../static/logo.svg";
// import axios from "../../utils/Axios"
// @withRouter

interface IProps extends RouteComponentProps<any> {
//   title: string;
  history: any;
}



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
  constructor(props:any){
    super(props)
      this.state = {
        visible: false
      }
      // console.log("Login 的 props",this.props)
  }
  componentDidMount(){
    console.log("%c    ","background: url(https://ws1.sinaimg.cn/large/8660d1bbly1g1w7kd4wb6j209g06ydfn.jpg) no-repeat left center;font-size: 11em;","\n");
  }
  render() {
    return (
      <div className="login">
      <img src={logo} alt=""/>
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


const mapStateToProps = (state:any,ownProps:any) => ({
  // return {
  //   counter: state.counter
  // }
  visible: state.visible,
  ...ownProps
})

const mapDispatchToProps = { 
  actionshow,
  actionhide
 }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter<IProps>(Login));
