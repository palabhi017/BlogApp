import * as types from './actionTypes'
import { getAllblogs } from './api'


export let loading = ()=>{
    return {type:types.LOADING}
}

export let error = ()=>{
    return {type:types.ERROR}

}

export let user = (id)=>{
    return {type:types.USERID,payload:id}
}

export let getblogs =()=> async(dispatch)=>{
 dispatch(loading())
    try {
        let blogs= await getAllblogs()
        console.log(blogs)
        if(blogs){
            dispatch({type:types.SUCCESS,payload:blogs})
        }
    } catch (error) {
        console.log(error)
        dispatch(error())
    }

}