import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventClearLogout } from "./events";



export const startLogin = ( email, password ) =>{
    return async( dispatch ) => {

        const resp = await( fetchSinToken( 'auth', { email, password}, 'POST' ) );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem( 'token', body.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() )


            dispatch( login({
                uid: body.uid,
                name: body.name
                })
            );
        } else {

            Swal.fire( 'error', body.msg, 'error' )

        };
    }

};

export const  startRegister = ( email , password , name ) =>{
    return async( dispatch ) =>{

        const resp = await( fetchSinToken( 'auth/new', {  email, password, name}, 'POST' ) );
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem( 'token', body.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() )

            dispatch( login({
                uid: body.uid,
                name: body.name
                })
            );
        }else {

            Swal.fire( 'Error', body.msg, 'error' )

        };

    }

};

export const startChecking = () =>{
    return async(dispatch)=>{
                          // fetchConToken ('auth/renew', {  }, 'GET' ) ---> no necesita argumentos y por defecto es get                 
        const resp = await( fetchConToken( 'auth/renew' ) );
        const body = await resp.json();
      
        if( body.ok ){
            localStorage.setItem( 'token', body.token )
            localStorage.setItem( 'token-init-date', new Date().getTime() )

            dispatch( login({
                uid: body.uid,
                name: body.name
                })
            );
        }else {
            dispatch( checkingFinish() )
        };




    }
}

const checkingFinish = () => ({ type: types.authChekingFinish })

const login = ( user ) => ({
    type: types.authLogin,
    payload: user

});

export const startLogout = () => {
    return ( dispatch )=>{

        localStorage.clear();
        dispatch(eventClearLogout())
        dispatch( logout() )
    }
} 

const logout = () => ({ type: types.authLogOut })


