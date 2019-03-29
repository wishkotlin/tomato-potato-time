import { show,hide } from "./actionTypes"
let showtop = false
export const actionshow = (payload:any) => {
    console.log(payload)
    return {
        type: show,
        payload: payload,
        showtop: showtop
    }
}

export const actionhide = (payload:any) => {

    return {
        type: hide,
        payload,
        showtop: !showtop
    }
}
