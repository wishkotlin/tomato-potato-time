import React, { Component } from 'react'
import "./TimeAction.scss"

interface mystate{
    cutDownTime:any
}
interface myprops{
    Rstart:any
}

export class TimeReast extends Component< myprops,mystate > {
    tick: any = null
    constructor(props:any){
        super(props)
        this.state = {
            cutDownTime: 300000
        }
    }
    
    componentDidMount(){
        // console.log("this.props.cutDownTime父子组件传值",this.props.cutDownTime)
        this.tick = setInterval(  () => {
            this.setState( (prestate,props) => ({
              cutDownTime: prestate.cutDownTime - 1000,
            }),() => {
                // let time = new Date().getTime()
            console.log("this.state.cutDownTime",this.state.cutDownTime)
            localStorage.setItem("cutDownTime",JSON.stringify(this.state))
          })
          if(this.state.cutDownTime < 1000){
            localStorage.removeItem("Time")
            localStorage.removeItem("cutDownTime")
            this.props.Rstart(null)//子组件 通过父组件的函数 修改父组件的值 来传值
            clearInterval(this.tick)
          }
        },1000 )
    }
  render() {
    let countDown = this.state.cutDownTime 
    const min = Math.floor(countDown/1000/60)
	const second = Math.floor(countDown/1000%60)
    const time = `${min}:${second<10?`0${second}`:second}`
    const percent = 1 - this.state.cutDownTime/300000
    return (
      <div>
        <div className="cutDownTime">
          <span className="restTime">{ time }</span>
          <div className="progress" style={{width: `${percent*100}%`}}/>
        
      </div>
      </div>
    )
  }
}

export default TimeReast
