import React, { Component } from 'react'
import "./TimeAction.scss"

interface mysatte{
    startTime:any,
    cutDownTime:any
}
interface myprops{
    cutDownTime:any,
    onUpdata:any,
    startTime:any,
    duration:any
}


export class TimeAction extends Component<myprops,mysatte> {
    tick: any;

    constructor(props:any){
        super(props)
        this.state = {
            startTime:"",
            cutDownTime: this.props.cutDownTime
        }
        this.tick = null
    }


    componentDidMount(){

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
                console.log("this.state.cutDownTime",this.state.cutDownTime)
                localStorage.setItem("cutDownTime",JSON.stringify(this.state))
              })
              if(this.state.cutDownTime < 1000){
                localStorage.removeItem("Time")
                localStorage.removeItem("cutDownTime")
                clearInterval(this.tick)
              }
            },1000 )
          // }
          
          
        }




   componentWillUnmount(){
      if(this.state.cutDownTime < 0){
        // localStorage.removeItem("Time")
        console.log("componentWillUnmount 定时器已经销毁")
        clearInterval(this.tick)
      }
  }



  render() {
    let countDown = this.state.cutDownTime 
    const min = Math.floor(countDown/1000/60)
	const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`
    const percent = 1 - this.state.cutDownTime/this.props.duration
    return (
      <div className="cutDownTime">
          <span className="restTime">{ time }</span>
          <div className="progress" style={{width: `${percent*100}%`}}/>
        
      </div>
    )
  }
}

export default TimeAction
