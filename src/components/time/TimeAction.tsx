import React, { Component } from 'react'
import "./TimeAction.scss"
import { Popconfirm,message   } from "antd"
// import Url from "https://dushu-1251966512.cos.ap-beijing.myqcloud.com/quick_ticking.ogg";
interface mysatte{
    startTime:any,
    cutDownTime:any,
    audioUrl: any,
    play: any,
    sunding:any
}
interface myprops{
    cutDownTime:any,
    onUpdata:any,
    startTime:any,
    duration:any,
    CancelTimeAction: any,
    synccutDownTime:any
}


export class TimeAction extends Component<myprops,mysatte> {
    tick: any;
    newaudio: any
    // private audiourl: React.RefObject<HTMLAudioElement>;
    constructor(props:any){
        super(props)
        // this.audiourl = React.createRef();
        this.state = {
            startTime:"",
            cutDownTime: this.props.cutDownTime,
            // audioUrl: 'https://dushu-1251966512.cos.ap-beijing.myqcloud.com/quick_ticking.ogg',
            audioUrl: 'https://static.pomotodo.com/app/sounds/ticking-eedbd7c3.ogg?v=3',
            play:false,
            sunding: false
        }
        this.tick = null
        this.newaudio = new Audio(this.state.audioUrl)
        // this.newaudio.muted = 'meted'
        // this.newaudio.allow = "autoplay"//否则 会出现 play() failed because the user didn't interact with the document first
        // this.newaudio.autoplay = true
        this.newaudio.loop = true
      }

  

    componentDidMount(){



      // this.newaudio.play()

      // this.newaudio.muted = true
      // this.togglePlay()

        // let tempstartTime = localStorage.getItem("Time")
        // if(tempstartTime !== null){
        //   this.setState({
        //       startTime: JSON.parse(tempstartTime).startTime
        //     })
        // }
        
          // timer = setInterval(
            
          //   () => this.tick(),1000
          // )
          // console.log("没有进入周期")
          // let tempstartTime = this.state.startTime
          // if(tempstartTime !== null){
          //     let temp = this.props.UpdateTime.UpdateTime[0]
          //     console.log("进入周期",temp)
          //   timer = setInterval( () => {
          //     this.props.actionUpdateTime(temp)
          //   },1000 )
          // }
      
          // let tempstartTime = this.state.startTime
          // console.log("tempstartTime",tempstartTime)
          // if(tempstartTime !== null){
          //   timer = setInterval(  () => {
          //       this.setState({
          //       cutDownTime: this.state.duration - 1000
          //     },() => {
          //       console.log("this.state.cutDownTime",this.state.cutDownTime)
          //     })
          //   },1000 )
          // }
          
            let link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = 'https://ws1.sinaimg.cn/large/8660d1bbly1g1vjxskqfbj205k05kmx2.jpg';
            document.getElementsByTagName('head')[0].appendChild(link);
        
          
          // let tempstartTime = localStorage.getItem("Time")
        //   console.log("componentDidMount",this.state)
        //   let tempstartTime = this.state.startTime
        //   console.log("tempstartTime",tempstartTime)
          // if(tempstartTime !== null){
              console.log("this.props.cutDownTime父子组件传值",this.props.cutDownTime)
            this.tick = setInterval(  () => {
                this.setState( (prestate,props) => ({
                  cutDownTime: prestate.cutDownTime - 1000,
                  startTime: this.props.startTime
                }),() => {
                    let time = new Date().getTime()
                    this.props.onUpdata(time)//子组件 通过父组件的函数 修改父组件的值 来传值
                // console.log("this.state.cutDownTime",this.state.cutDownTime)
                this.props.synccutDownTime(this.state.cutDownTime)
                // console.log('TimeAction 设置localStorage')
                localStorage.setItem("cutDownTime",JSON.stringify(this.state))
                // this.newaudio.play()
                
              })
              if(this.state.cutDownTime < 1000){
                // localStorage.removeItem("Time")
                // localStorage.removeItem("cutDownTime")
                clearInterval(this.tick)
                this.newaudio.pause()
              }
            },1000 )
          // }
          
          
        }





        


        Confirm = () => {
          console.log("点击了确定")
          clearInterval(this.tick)
          localStorage.removeItem("cutDownTime")
          localStorage.removeItem("Time")
          this.props.CancelTimeAction()
          message.success('番茄时间已放弃');
          document.title = `Hey番茄土豆`;
          let link:any = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = '/Tomato-potato-time/Tomato.png';
            document.getElementsByTagName('head')[0].appendChild(link);
            //关闭 滴答
            this.newaudio.pause()
        }

   componentWillUnmount(){
      if(this.state.cutDownTime < 1000){
        // localStorage.removeItem("Time")
        console.log("componentWillUnmount 定时器已经销毁")
        clearInterval(this.tick)
      }
  }





  sunding = () => {
    if(this.state.sunding === true){
      this.setState({
        sunding: false
      })
      this.newaudio.pause()
    }else{
      this.newaudio.play()
      this.setState({
        sunding: true
      })
    }
    
  }
  



  render() {
    let countDown = this.state.cutDownTime 
    const min = Math.floor(countDown/1000/60)
	  const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`
    const percent = 1 - this.state.cutDownTime/this.props.duration
    // const title = document.title;
    document.title = `${time} - Hey番茄土豆`;
    return (
      <div className="cutDownTime">
          <span className="restTime">{ time }</span>
          <div className="progress" style={{width: `${percent*100}%`}}/>
          <Popconfirm onConfirm={ this.Confirm  } title="您目前正在一个番茄工作时间中，要放弃这个番茄吗？" okText="确定" cancelText="取消"><span className="TimeActioncancel">×</span></Popconfirm>
          <span onClick={this.sunding} className={this.state.sunding ? 'sound' : `sound soundhide`}>🔈</span>
          <span onClick={this.sunding} className={this.state.sunding ? 'nosound  soundhide' : `nosound`}>🔇</span>
          {/* <audio ref={ this.audiourl } onCanPlay={ this.controlAudio } style={{ display: 'none', }} src={ this.state.audioUrl } controls preload="none" controlsList="nodownload" >
                      <track kind="captions" />
                      您的浏览器不支持 audio 元素。
          </audio> */}
      </div>
    )
  }
}

export default TimeAction
