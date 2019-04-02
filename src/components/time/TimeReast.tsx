import React, { Component } from 'react'
import "./TimeAction.scss"
import { Popconfirm } from "antd"

interface mystate{
    cutDownTime:any
}
interface myprops{
    Rstart:any,
    CancelTimeAction: any
}

export class TimeReast extends Component< myprops,mystate > {
    tick: any = null
    constructor(props:any){
        super(props)
        this.state = {
            // cutDownTime: 300000
            cutDownTime: 30000
        }
    }
    
    componentDidMount(){
        // console.log("this.props.cutDownTime父子组件传值",this.props.cutDownTime)
        
        let TimeRest = localStorage.getItem("TimeRest")
        if(TimeRest !== null){
          let tempTimeRest = JSON.parse(TimeRest).cutDownTime
          this.setState({
            cutDownTime: tempTimeRest
          })

        }
        
        this.tick = setInterval(  () => {
            this.setState( (prestate,props) => ({
              cutDownTime: prestate.cutDownTime - 1000,
            }),() => {
                // let time = new Date().getTime()
            console.log("this.state.cutDownTime",this.state.cutDownTime)
            localStorage.setItem("TimeRest",JSON.stringify(this.state))
          })
          if(this.state.cutDownTime < 1000){
            localStorage.removeItem("Time")
            localStorage.removeItem("TimeRest")
            this.props.Rstart(null)//子组件 通过父组件的函数 修改父组件的值 来传值
            clearInterval(this.tick)
          }
        },1000 )
    }

    Confirm = () => {
      this.props.CancelTimeAction()
      localStorage.removeItem("Time")
      localStorage.removeItem("TimeRest")
    }


  render() {
    let countDown = this.state.cutDownTime 
    const min = Math.floor(countDown/1000/60)
	const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`
    const percent = 1 - this.state.cutDownTime/30000
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
