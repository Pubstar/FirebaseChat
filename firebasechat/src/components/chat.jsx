import { useState, React, useEffect } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, onSnapshot, query, serverTimestamp, orderBy } from 'firebase/firestore';

const Chat = (props) => {

    const auth = getAuth();
    const db = getFirestore(props.app);
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                user: auth.currentUser.displayName,
                message: document.getElementById('message').value,
                time: serverTimestamp()
            });
            document.getElementById('message').value = '';
            return docRef
        } catch (e) {
            alert("Error adding document: ", e);
        }
    }

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy('time'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setMessages(items);
        })
        return unsubscribe;
    }, [])

    return (
        <main className='w-full h-screen bg-gray-800 flex text-neutral-100 flex-col justify-between items-center'>
            <div className='flex justify-between w-full p-4 bg-slate-900'>
                <p>Signed in as: {auth.currentUser.displayName}</p>
                <p onClick={() => signOut(auth).then(() => props.setAuthState(null))} className=' cursor-pointer'>Sign Out</p>
            </div>
            <div className=' h-full w-full p-2'>
                {messages.map((message) => {
                    return (
                        <div className=' mb-4' key={auth.currentUser.uid}>
                            <img src={auth.currentUser.photoURL} alt="" className=' inline w-6 mr-2 rounded-full' />
                            <span className=' text-red-700'>{message.user}</span>
                            <p className=' px-8'>{message.message}</p>
                        </div>
                    )
                })}
            </div>
            <div className=' w-full h-[10%] border flex'>
                <input className=' w-11/12 h-full text-black font-semibold p-4' type="text" name="message" id="message" />
                <button onClick={sendMessage} className=' flex justify-center items-center w-1/12 font-semibold text-lg'>Send</button>
            </div>
        </main>
    )
}

export default Chat