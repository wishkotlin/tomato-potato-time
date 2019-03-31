import { UpdateTime } from "../actionTypes"
// let showtop = false
export default (state:any = [],action:any) => {
// console.log()
    switch(action.type){
        case UpdateTime://更新时间
        console.log("UpdateTimestate",state)
        console.log("action.payload",action.payload)
            return state.push(action.payload - 1000)//返回 state 使用 this.props.state 接收
        default:
        console.log("show",state)
        console.log("action.payload",action.payload)
            return state
    }
}