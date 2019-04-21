import {AudioR} from '../actionTypes';
// let src = "https://static.pomotodo.com/app/sounds/ticking-eedbd7c3.ogg?v=3"
// let x:any = {
//     src: src,
//     audio: new Audio(src)
// }
// function a(){
    
// }
class a{
    src: string;
    audio: any;
    constructor(src:string,audio?:any){
        this.src = src;
        this.audio = new Audio(this.src);
        this.audio.loop = true
    }
}
let x = new a("https://static.pomotodo.com/app/sounds/ticking-eedbd7c3.ogg?v=3",)
export default (state:any = x,action:any) => {
    // console.log()
        switch(action.type){
            case AudioR://更新时间
            // console.log("UpdateTimestate",state)
            console.group()
            console.log("action.payload",action.payload)
            state.src = action.payload
            console.log("state",state)
            console.groupEnd()
                return state
            default: 
            // console.log("show",state)
            // console.log("action.payload",action.payload)
                return state
        }
    }