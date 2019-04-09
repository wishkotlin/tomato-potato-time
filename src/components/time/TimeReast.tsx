import React, { Component } from 'react'
import "./TimeAction.scss"
import { Popconfirm } from "antd"
import Url from '../static/quick_ticking.ogg'

interface mystate{
  RestTime:any,
  audioUrl:any
}
interface myprops{
    Rstart:any,
    CancelTimeAction: any
}

export class TimeReast extends Component< myprops,mystate > {
    tick: any = null
    newaudio: any
    constructor(props:any){
        super(props)
        this.state = {
            // cutDownTime: 300000
            RestTime: 300000,
            audioUrl: Url
        }
        this.newaudio = new Audio(this.state.audioUrl)
    }
    
    componentDidMount(){
        // console.log("this.props.cutDownTime父子组件传值",this.props.cutDownTime)
        

        let link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'https://ws1.sinaimg.cn/large/8660d1bbly1g1vjxskqfbj205k05kmx2.jpg';
        document.getElementsByTagName('head')[0].appendChild(link);



        let TimeRest = localStorage.getItem("TimeRest")
        if(TimeRest !== null){
          let tempTimeRest = JSON.parse(TimeRest).RestTime
          this.setState({
            RestTime: tempTimeRest
          })

        }
        
        this.tick = setInterval(  () => {
            this.setState( (prestate,props) => ({
              RestTime: prestate.RestTime - 1000,
            }),() => {
                // let time = new Date().getTime()
            console.log("this.state.cutDownTime",this.state.RestTime)
            localStorage.setItem("TimeRest",JSON.stringify(this.state))
            //开始播放 计时音乐
            this.newaudio.play()
          })
          if(this.state.RestTime < 1000){
            localStorage.removeItem("Time")
            localStorage.removeItem("TimeRest")
            localStorage.removeItem("cutDownTime")
            this.props.Rstart(null)//子组件 通过父组件的函数 修改父组件的值 来传值
            clearInterval(this.tick)
          }
        },1000 )
    }

    Confirm = () => {
      this.props.CancelTimeAction()
      localStorage.removeItem("Time")
      localStorage.removeItem("TimeRest")
      localStorage.removeItem("cutDownTime")
      document.title = `Hey番茄土豆`;
      let link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = '/Tomato-potato-time/Tomato.png';
            document.getElementsByTagName('head')[0].appendChild(link);

      this.newaudio.pause()
    }


  render() {
    let countDown = this.state.RestTime 
    const min = Math.floor(countDown/1000/60)
	  const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`
    const percent = 1 - this.state.RestTime/300000
    document.title = `${time} - Hey番茄土豆`;
    return (
      <div>
        <div className="cutDownTime">
          <span className="restTime">{ time }</span>
          <div className="progress" style={{width: `${percent*100}%`}}/>
          <Popconfirm onConfirm={ this.Confirm  } title="您目前正在一个番茄工作时间中，要放弃这个番茄吗？" okText="确定" cancelText="取消"><span className="TimeActioncancel">×</span></Popconfirm>        
      </div>
      </div>
    )
  }
}

export default TimeReast
