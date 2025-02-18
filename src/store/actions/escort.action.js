import * as actionTypes from './actionType';
import {SERVER_REQUEST} from '../../shared/Backend'
import {ApiEndpoints} from '../../config/Config'
// import {GET_TOKEN, GET_USER} from '../../shared/Storage'
import { toast } from 'react-toastify';


export const escortStart = () => {
    return{
        type: actionTypes.ESCORT_START,
    }
}

export const escortSuccess = (payload) => {
    return{
        type: actionTypes.ESCORT_SUCCESS,
        payload: payload
    }
}

export const singleEscortSuccess = (payload) => {
    return{
        type: actionTypes.SINGLE_ESCORT_SUCCESS,
        payload: payload
    }
}



export const escortFailed = (error) => {
    return{
        type: actionTypes.ESCORT_FAIL,
        error
        
    }
}

export const escortUnload = () =>{
    return {
        type: actionTypes.ESCORT_UNLOAD
    }
}





export const fetchEscortDetails = (data) => {

        return (dispatch) => {
            dispatch(escortStart())

            const payload = {
                categoryName: data
            }
           
            
            SERVER_REQUEST(ApiEndpoints.FETCH_ESCORTS, 'post', payload).then((data) => {
                console.log(data);
                
                if(data.status === 200){
                    
                    dispatch(escortSuccess(data.data));
                }

                if(data.status !== 200){
                    dispatch(escortFailed())

                    toast.error("An Error occured while fetching Escorts! Try again", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
    
               
            }).catch((error) => {
                dispatch(escortFailed())
                // toast.error("An Error occured while fetching Escort! Try again", {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     });
            })
        }
    
}




export const fetchSingleEscortDetails = (data) => {

    return (dispatch) => {
        dispatch(escortStart())

        SERVER_REQUEST(ApiEndpoints.FETCH_SINGLE_ESCORT, 'post', data).then((data) => {
            console.log(data);
            
            if(data.status === 200){
                
                dispatch(singleEscortSuccess(data.data));
                
            }

            if(data.status !== 200){
                dispatch(escortFailed())
                toast.error("An Error occured while fetching Escort! Try again", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

           
        }).catch((error) => {
            dispatch(escortFailed())
            toast.error("An Error occured while fetching Escort! Try again", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        })
    }

}


export const escortOnUnload = () => {
    return dispatch => {
        dispatch(escortUnload())
    }
}