import { AudioR } from '../actionTypes';

export const audio = (payload:any) => {
    // console.log(payload)
    return {
        type: AudioR,
        payload: payload,
    }
}