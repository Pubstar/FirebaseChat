import { useState, React, useEffect, useRef } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, onSnapshot, query, serverTimestamp, orderBy } from 'firebase/firestore';

const Chat = (props) => {
    const auth = getAuth();
    const db = getFirestore(props.app);
    const [messages, setMessages] = useState([]);
    const scroller = useRef(null);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (auth.currentUser == null) {
            alert('You must be logged in to post.')
            return
        }
        if (document.getElementById('message').value.length < 1) return;
        try {
            const docRef = await addDoc(collection(db, "messages"), {
                user: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
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
        if (auth.currentUser == null) {
            document.getElementById('message').disabled = true;
            document.getElementById('send-button').disabled = true;
        }

        const q = query(collection(db, "messages"), orderBy('time'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            })
            setMessages(items)
        })
        return unsubscribe;
    }, [])

    useEffect(() => {
        scroller.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <main className='w-full h-screen bg-gray-800 flex text-neutral-100 flex-col justify-between items-center'>
            <div className='flex justify-between w-full p-4 bg-slate-900'>
                {auth.currentUser && <p>Signed in as: {auth.currentUser.displayName}</p>}
                <p onClick={() => signOut(auth).then(() => props.setAuthState(null))} className=' cursor-pointer'>Sign Out</p>
            </div>
            <div className=' h-full w-full p-2 overflow-y-scroll'>
                {messages.map((message, idx) => {
                    return (
                        <div className=' mb-4 break-words' key={idx}>
                            <img src={message.photoURL} alt="" className=' inline w-6 mr-2 rounded-full' />
                            <span className=' text-red-700'>{message.user}</span>
                            {message.time && <span className=' ml-2 text-xs text-white/40'>{message.time.toDate().toUTCString()}</span>}
                            <p className=' px-8'>{message.message}</p>
                        </div>
                    )
                })}
                <div ref={scroller}></div>
            </div>
            <form onSubmit={sendMessage} className=' w-full h-[10%] border flex'>
                <input autoFocus className=' w-11/12 h-full text-black font-semibold p-4' type="text" name="message" id="message" />
                <button type='submit' id='send-button' className=' flex justify-center items-center w-1/12 font-semibold text-lg min-w-[80px]'>Send</button>
            </form>
        </main>
    )
}

export default Chat