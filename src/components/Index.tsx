import React from 'react'
import { Spin,Button } from 'antd';
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
    if(localStorage.getItem("x-token") === null || ""){
      this.props.history.push("/login")
    }else{
      this.getuser()
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
    try {
      const result = await axios.get("me")
      console.log(result)
      this.setState({
        username:result.data.account
      },()=>{
        console.log(this.state.username)
      })
    } catch (error) {
      console.log(error,"获取用户失败")
    }
    
  }
  
  


  render() {
    return (
      <div className="index">
      <p>欢迎使用Hey番茄土豆{ this.state.username }</p>
      <Spin size="large" />
      <div>
        <Button onClick={this.indexlogout} type="primary" className="indexlogin">退出</Button>
        {/* <Button onClick={this.indexsignup} type="primary" className="indexsignup">注册</Button> */}
      </div>
      <video ref={this.video} onTouchStart={this.play} onMouseLeave={this.play} muted autoPlay src={"https://raw.githubusercontent.com/liulinboyi/Tomato-potato-time/master/src/static/bg.mp4"} className="kv-vbg" preload="auto"></video>
      
        {/* <Login /> */}
      </div>
    )
  }
}

export default withRouter<any>(Index)
