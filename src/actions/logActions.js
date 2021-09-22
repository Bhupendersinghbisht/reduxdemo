import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR,
    ADD_LOGS,
    DELETE_LOGS,
    UPDATE_LOGS,
    SET_CURRENT,
    CLEAR_CURRENT,
    SEARCH_LOGS
} from './types'
// export const getLogs =() =>{
//     return async(dispatch,getState) => {
// setLoading();

// const res=await fetch('/logs');
// const data=await res.json();

// dispatch({
//     type:GET_LOGS,
//     payload:data
// })
//     }
// }

//get logs from server
export const getLogs =() => async dispatch =>{    
    try {
        setLoading();
        const res=await fetch('/logs');
        const data=await res.json();
        dispatch({
            type:GET_LOGS,
            payload:data
        })        
    } catch (error) {
        dispatch({
            type:LOGS_ERROR,
            payload:error.response
        })
    }    
}


//Search Log
export const searchLogs =(text) => async dispatch =>{    
    try {
        setLoading();
        const res=await fetch(`/logs?q=${text}`);
        const data=await res.json();
        dispatch({
            type:SEARCH_LOGS,
            payload:data
        })        
    } catch (error) {
        dispatch({
            type:LOGS_ERROR,
            payload:error.response.data
        })
    }    
}

//Add logs from server
export const addLog =(log) => async dispatch =>{
    
    try {
        setLoading();
        const res=await fetch('/logs',{
            method:'POST',
            body: JSON.stringify(log),
            headers:{
                'Content-Type':'application/json'
            }
        });
        const data=await res.json();
        dispatch({
            type:ADD_LOGS,
            payload:data
        })        
    } catch (error) {
        dispatch({
            type:LOGS_ERROR,
            payload:error.response.data
        })
    }

    
}


export const deleteLog =(id) => async dispatch =>{
    try {
        setLoading();
        await fetch(`/logs/${id}`, {
            method: 'DELETE'
          });
      
          dispatch({
            type: DELETE_LOGS,
            payload: id
          });
    } catch (error) {
        dispatch({
            type:LOGS_ERROR,
            payload:error.response
        })
    }
}

//update log on server

export const updateLog =(log) => async dispatch =>{
    try {
        setLoading();
        const res=await fetch(`/logs/${log.id}`, {
            method: 'PUT',
            body:JSON.stringify(log),
            headers:{
                'Content-Type':'application/json'
            }
          });
      const data=await res.json();
          dispatch({
            type: UPDATE_LOGS,
            payload: data 
          });
    } catch (error) {
        dispatch({
            type:LOGS_ERROR,
            payload:error.response
        })
    }
}
//set Current log
export const setCurrent = log =>{
    return{
        type:SET_CURRENT,
        payload:log
    }
}

//clear current log
const clearCurrent = () =>{
    return{
        type:CLEAR_CURRENT,
        
    }
}

//set loading to true
export const setLoading =() =>{
    return{
        type:SET_LOADING
    }
}