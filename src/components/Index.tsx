import React from 'react'
// import { Spin,Button } from 'antd';
import { Input,Menu, Dropdown, Icon, message, } from "antd"
import { withRouter } from "react-router-dom";
import axios from "../utils/Axios";
// import "../static/bg.mp4"
import "./index.scss";
// import Login from "./Login";
interface myprops{
  history:any,
}
interface mystate{
  test:boolean,
  username:any
}
// const onClick = ({ key }:any) => {
//   message.info(`Click on item ${key}`);
// };
// const menu = (
//   <Menu onClick={onClick}>
//     <Menu.Item key="1">账号</Menu.Item>
//     <Menu.Item key="2">偏好设置</Menu.Item>
//     <Menu.Item key="3">退出</Menu.Item>
//   </Menu>
// );
class Index extends React.Component<myprops,mystate> {


  private video: React.RefObject<HTMLVideoElement>;//视频节点
  // static getuser: any;

  constructor(props:any) {
        super(props);
        this.video = React.createRef();
        this.state = {
          test: false,
          username: ""
        } as mystate
    }


  indexlogout = () => {
    localStorage.removeItem("x-token")
    localStorage.removeItem("userInfo")
    this.setState({
      username: ""
    })
    this.props.history.push("/login")
  }
  indexsignup = () => {
    this.props.history.push("/signup")
  }
  play = (e:any) => {
    // let video = document.querySelectorAll(".kv-vbg")
    let video = e
    // let play = document.querySelectorAll(".kv-vbg") as NodeListOf<VideoHTMLAttributes>
    if(video){
      // console.log(video.target);
      video.target.play()
    }
    
    // let video = this.refs("video")
    // video.play()
  }
  goPAGE = () => {                               
    
      if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) && window.innerWidth <= 500) {
      // window.location.href="移动端url";
          // alert("mobile")
          // document.getElementById()
          console.log("video",this.video.current)
          if(this.video.current && this.video.current.parentNode){
            this.video.current.parentNode.removeChild(this.video.current)
          }
          
      }
      else {
          // window.location.href="pc端url"; 
          // alert("pc")
      }
  }

  componentDidMount(){
    this.goPAGE()
    console.log(localStorage.getItem("x-token"))
    const userInfo = localStorage.getItem('userInfo')
    if(localStorage.getItem("x-token") === null || ""){
      this.props.history.push("/login")
    }else{
      if(userInfo !== null){
    console.log("localstorage请求")
        this.setState({
          username: JSON.parse(userInfo).data.account//解析json字符串
        })
      }else{
        this.getuser()
      }
      // this.getuser()
    }
    
    
  }


  static getDerivedStateFromProps = (nextProps:myprops, prevState:mystate):mystate => {
    let nextState = {} as mystate
    console.log("props",nextProps)
    console.log("state",prevState)
    nextState.test = true
    console.log(nextState.test)
    // console.log(Index.toString())
    // Index.getuser()

    // let getuser =  async() => {
    //     try {
    //     const result:any = await axios.get("me")
    //     console.log(result)
    //     nextState.username = result.data.account
    //     console.log(nextState.username)
    //   } catch (error) {
    //     console.log(error,"获取用户失败")
    //   }
    //   // return nextState
    // }
    // getuser()
    
    return nextState
  }
  // 

  getuser = async() => {
    console.log("网络请求")
    try {
      const result:any = await axios.get("me")
      console.log(result)
      localStorage.setItem("userInfo",JSON.stringify(result))//转换json存储
      this.setState({
        username:result.data.account
      },()=>{
        console.log(this.state.username)
      })
    } catch (error) {
      console.log(error,"获取用户失败")
    }
    
  }
  
  onClick = ({ key }:any) => {
    // message.info(`Click on item ${key}`);
    console.log(key === '3')
    if(key === '3'){
      message.info("退出成功")
      this.indexlogout()
    }
  };
  menu = (
    <Menu onClick={this.onClick}>
      <Menu.Item key="1">账号</Menu.Item>
      <Menu.Item key="2">偏好设置</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );


  render() {
    return (
      <div className="index">
      <header>
        <span className="logo">欢迎使用Hey番茄土豆</span>
              <Dropdown overlay={this.menu}>
          <a className="ant-dropdown-link" href="/account">
          { this.state.username || "请登录" } <Icon type="down" />
          </a>
        </Dropdown>
        
      </header>
      {/* <p>{ this.state.username }</p> */}
        <main>
          <Input allowClear placeholder="待办事项" />
        </main>
      
      {/* <Spin size="large" />
      <div>
        <Button onClick={this.indexlogout} type="primary" className="indexlogin">退出</Button>
       
      </div>
      <video ref={this.video} onTouchStart={this.play} onMouseLeave={this.play} muted autoPlay src={"https://raw.githubusercontent.com/liulinboyi/Tomato-potato-time/master/src/static/bg.mp4"} className="kv-vbg" preload="auto"></video>
       */}
        {/* <Login /> */}
        {/* <Button onClick={this.indexlogout} type="primary" className="indexlogin">退出</Button> */}
      </div>
    )
  }
}

export default withRouter<any>(Index)
