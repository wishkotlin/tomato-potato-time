import { show,hide } from "../actionTypes"
// let showtop = false
export default (state:any = false,action:any) => {
// console.log()
    switch(action.type){
        case show://显示
        // console.log("show",state)
            return !state//返回 state 使用 this.props.state 接收
        case hide://隐藏
        // console.log("hide",state)
            return !state
        default:
            return state
    }
}