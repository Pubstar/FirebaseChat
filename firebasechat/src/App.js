import Chat from './components/Chat.jsx';
import Login from './components/Login.jsx';
import { initializeApp } from "firebase/app";
import { useState } from 'react';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ45gKGi4jGO72A6GXuq9MiPTmajyDoMI",
  authDomain: "chatbox-77947.firebaseapp.com",
  projectId: "chatbox-77947",
  storageBucket: "chatbox-77947.appspot.com",
  messagingSenderId: "553043047425",
  appId: "1:553043047425:web:f1aa9caa1e6ec810a67c00"
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
