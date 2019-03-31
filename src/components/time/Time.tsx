import React, { Component } from 'react'
import { Button,Icon,Input } from 'antd';
// import { connect } from "react-redux";
// import { actionUpdateTime } from "../../redux/actions";
import TimeAction from "./TimeAction";
import TimeRest from "./TimeReast";

interface myprops{
  // actionUpdateTime:any,
  // UpdateTime:any
  // cutDownTime:any
}
interface mystate{
  createTime:any,
  description:any,
  exta:any,
  id:any,
  user_id:any,
  startTime:any,
  UpdataTime:any,
  duration:any,
  cutDownTime:any,
  TimeNow:any,
  Tomoto:any
}


// let timer:any

class Time extends Component< myprops,mystate > {
  tick: any;

  constructor(props:any){
    super(props)
    this.state = {
      createTime: "",
      description: [],
      exta: {},
      id: "",
      user_id: "",
      startTime: null,
      UpdataTime: "",
      // duration: 1500000,//时间间隔
      duration: 1500000,//时间间隔
      cutDownTime: 1500000,
      TimeNow: "",
      Tomoto: []
    }
    this.tick = null
    console.log("Time组件",this.props)
  }


  TimeStart = (e:any) => {
    let tempcreateTime = new Date().getTime()
    this.setState( {
      createTime: tempcreateTime,
      // description: "",
      startTime: tempcreateTime,
      UpdataTime: "",
      cutDownTime: 1500000
    } ,() => {
      // this.props.actionUpdateTime(this.state.cutDownTime)
      // console.info("this.props.UpdateTime.UpdataTime",this.props.UpdateTime.UpdateTime[0])
      localStorage.setItem("Time",JSON.stringify(this.state))
    })
  }

  // TimeChange = (e:any) => {
  //   e.persist()
  //   console.log(e.target.value)
  //   // this.setState({
  //   //   description: e.target.value
  //   // },() => {
  //   //   console.log("description",this.state.description)
  //   // })
  // }

  Timeonkey = (e:any) => {
    e.persist()
    
    if( e.keyCode === 13 ){
      let temp = this.state.description
      let tempTomoto = this.state.Tomoto
      temp.push(e.target.value)
      tempTomoto.push(e.target.value)
      this.setState({
        description: temp,
        Tomoto: tempTomoto
      },() => {
        e.target.value = ""
        console.log("description",this.state.description)
        console.log("Tomoto",this.state.Tomoto)
    localStorage.setItem("Time",JSON.stringify(this.state))
    localStorage.setItem("Tomato",JSON.stringify(this.state.Tomoto))

      })
    }
  }


// tick = () => {
//   //  let temp = this.state.duration
    
//     // temp = temp - 1000
//     if(this.state.startTime !== null){
//       // console.log(this.props.UpdateTime.UpdateTime[0])
//       this.setState({
//       // cutDownTime: this.props.UpdateTime.UpdateTime[0].cutDownTime - 1000,
//     },() => {
//       // this.props.actionUpdateTime(this.state.cutDownTime)
//       // console.info("this.props.UpdateTime.UpdataTime",this.props.UpdateTime.UpdateTime[0])
//       console.log("cutDownTime",this.state.cutDownTime)
//   localStorage.setItem("Time",JSON.stringify(this.state))
//     })
//   }
// }


  componentDidMount(){
    let Tomato = localStorage.getItem("Tomato")
    if(Tomato !== null){
      Tomato = JSON.parse(Tomato)
      this.setState({
        Tomoto: Tomato
      })
    }
  }


  componentDidUpdate(){
    
  }

  componentWillUpdate(){
    
  }

  // shouldComponentUpdate(nextstate:any,nextprops:any){

  //   return true
  // }

  // componentWillUnmount(){
  //     if(this.state.cutDownTime < 0){
  //       localStorage.removeItem("Time")
  //       clearInterval(timer)
  //     }
  // }

  //子组件传值函数
  TimeAction(value:any){
    console.log("TimeAction",value)
    this.setState( (preProps,state) => ({
      TimeNow: value
    }),() => {
      console.log("子组件传值后的",this.state.TimeNow)
    } )
  }


  Rstart = (value:any) => {
    this.setState({
      startTime: value,
      description: []
    })
  }


  
  render() {
    // let TimeNow = new Date().getTime()
    let TimeNow = new Date().getTime()
    console.log(TimeNow,this.state.startTime,TimeNow - this.state.startTime)
    let Tomato =  this.state.Tomoto.length === 0 ? (<div className="clock-circle"><Icon type="clock-circle" />
    <p>没有记录</p></div>) : (this.state.Tomoto.map( (item:any,key:any) => {
      return <span key={key} className="Tomato"><p >{ item }</p></span>
    } ))
    console.log("Tomato render",this.state.Tomoto.length)
    let TimeResult
    if(this.state.startTime !== null){
      if(TimeNow - this.state.startTime > this.state.duration){
        TimeResult =  this.state.description.length === 0 ? (
        <div><Input onKeyDown={ this.Timeonkey } 
        // value={ this.state.description } 
        // onChange={ this.TimeChange } 
        placeholder="完成了什么" />
            { Tomato }
        </div>) : (<span><TimeRest Rstart={ (value:any) => this.Rstart(value) } />
        { Tomato }
        </span>)
      }else{
        TimeResult = (<span><TimeAction 
          // onUpdata方法就是子组件状态改变时就会调用这个函数，通过这个函数子组件就会触发父组件的ChildrenFunc方法，从而达到修改state的功能
          onUpdata={ (value:any) => this.TimeAction(value) } 
          cutDownTime={ this.state.cutDownTime }
          startTime={ this.state.startTime }
          duration={ this.state.duration }
          />
          
          { Tomato }
         
          </span>)//倒计时
      }
    }else{
      TimeResult =  (<div>
        {/* <Input placeholder="完成了什么" /> */}
      <Button type="primary" onClick={ this.TimeStart } >开始番茄</Button>
      
          {/* <Icon type="clock-circle" />
          <p>没有记录</p> */}
          { Tomato }
      </div>)
    }

     
    return (
      <div className="time">
        { TimeResult }
      </div>
    )
  }
}


// const mapStateToProps = (state:any,ownProps:any) => ({
//   // return {
//   //   counter: state.counter
//   // }
//   UpdateTime: state,
//   ...ownProps
// })

// const mapDispatchToProps = { 
//   actionUpdateTime
//  }

export default Time
