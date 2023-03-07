import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import { initializeApp } from "firebase/app";
import { useState } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbseGuwK9FTRkcChnhQpu0_fUpx-tjL4o",
  authDomain: "chatbox-7aa17.firebaseapp.com",
  projectId: "chatbox-7aa17",
  storageBucket: "chatbox-7aa17.appspot.com",
  messagingSenderId: "529814239555",
  appId: "1:529814239555:web:072cabe32ae212631697f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [authState, setAuthState] = useState();

  return (
    <div>
      {authState == null ? <Login setAuthState={setAuthState} /> : <Chat setAuthState={setAuthState} app={app} />}
    </div>
  );
}

export default App;
