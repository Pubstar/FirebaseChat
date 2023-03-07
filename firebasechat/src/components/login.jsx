import React from 'react'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = (props) => {

    const openLogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                props.setAuthState(getAuth());
            }).catch((error) => {
                alert(error.message);
            });
    }

    return (
        <div className=' h-screen w-full flex justify-center flex-col gap-12 items-center bg-gray-800'>
            <div onClick={openLogin} className=' h-16 rounded text-2xl text-white p-1 cursor-pointer bg-blue-500 hover:shadow-xl shadow-blue-600'>
                <img className=' bg-white p-4 inline h-full' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt="" />
                <span className=' px-8'>Sign in with Google</span>
            </div>
            <button onClick={() => { props.setAuthState('Guest') }} className='text-2xl text-white px-8 py-3 cursor-pointer rounded bg-blue-500 hover:shadow-xl shadow-blue-600'>Continue as guest</button>
        </div>
    )
}

export default Login