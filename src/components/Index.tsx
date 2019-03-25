import React, { Component } from 'react'
import { Spin,Button } from 'antd';
import { withRouter } from "react-router-dom";
// import "../static/bg.mp4"
import "./index.scss";
// import Login from "./Login";
class Index extends Component<any,any> {


  private video: React.RefObject<HTMLVideoElement>;//视频节点

  constructor(props:any) {
        super(props);
        this.video = React.createRef();
    }


  indexlogin = () => {
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
      console.log(video.target);
      video.target.play()
    }
    
    // let video = this.refs("video")
    // video.play()
  }
  goPAGE(){                               
    
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
      <video ref={this.video} onTouchStart={this.play} onMouseLeave={this.play} muted autoPlay src={"https://apd-vlive.apdcdn.tc.qq.com/vcloud1022.tc.qq.com/1022_926bb4e77b324d29b73eed223a86180e.f0.mp4?vkey=438E01E8578F201B9CAA072A16DE34FA6A8D0F92ED3C4E550D5E53381DDB5934837FCA960E45B05382826E9EC5B12B868466AB921CCAC91081636875F15C89EC3004B64660E540F608338A054D1E287045B19BF17FF20E69&sha=0"} className="kv-vbg" preload="auto"></video>
      
        {/* <Login /> */}
      </div>
    )
  }
}

export default withRouter<any>(Index)
