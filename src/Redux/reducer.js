import * as types from "./actionTypes"

const init = {
    load:false,
    error:false,
    blogs:[],
    user:{}

}

export const reducer =(state=init,{type,payload})=>{

    switch(type){
        case types.LOADING :
            return {...state,load:true}
        case types.SUCCESS :
            return {...state,blogs:payload,load:false}
        case types.USERID :
            return {...state,user:payload}
        case types.ERROR :
            return {...state,load:false,error:true}
        default: {
            return state;
        }
    }
}



