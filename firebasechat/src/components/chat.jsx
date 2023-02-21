import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const chat = (props) => {

    const auth = getAuth();
    const db = getFirestore(props.app);

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                user: auth.currentUser.displayName,
                message: document.getElementById('message').value
            });
            document.getElementById('message').value = '';
        } catch (e) {
            alert("Error adding document: ", e);
        }
    }

    return (
        <main className='w-full h-screen bg-gray-800 flex text-neutral-100 flex-col justify-between items-center'>
            <div className='flex justify-between w-full p-4 bg-slate-900'>
                <p>Signed in as: {auth.currentUser.displayName}</p>
                <p onClick={() => signOut(auth).then(() => props.setAuthState(null))} className=' cursor-pointer'>Sign Out</p>
            </div>
            <div className=' h-full w-full'>
                Load all messages...
                Loop over messages and create a message bubble for all
                Change styling on host messages
            </div>
            <div className=' w-full h-[10%] border flex'>
                <input className=' w-11/12 h-full text-black font-semibold p-4' type="text" name="message" id="message" />
                <button onClick={sendMessage} className=' flex justify-center items-center w-1/12 font-semibold text-lg'>Send</button>
            </div>
        </main>
    )
}

export default chat