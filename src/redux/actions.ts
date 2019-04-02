import { show,hide,UpdateTime,ADD_TOMATO,UPDATE_TOMATO,INIT_TOMATOES } from "./actionTypes"

export const actionshow = (payload:any) => {
    // console.log(payload)
    return {
        type: show,
        payload: payload,
    }
}

export const actionhide = (payload:any) => {

    return {
        type: hide,
        payload,
    }
}

export const actionUpdateTime = (payload:any) => {
    return {
        type: UpdateTime,
        payload,
    }
}

export const ADDTOMATO = (payload:any) => {
    return {
        type: ADD_TOMATO,
        payload
    }
}

export const UPDATETOMATO = (payload:any) => {
    return {
        type: UPDATE_TOMATO,
        payload
    }
}

export const INITTOMATOES = (payload:any) => {
    return {
        type: INIT_TOMATOES,
        payload
    }
}
