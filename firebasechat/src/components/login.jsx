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
        <div className=' h-screen w-full flex justify-center items-center bg-gray-800'>
            <div onClick={openLogin} className=' text-4xl border px-8 py-2 border-black cursor-pointer bg-gray-300'>Login with Google</div>
        </div>
    )
}

export default Login