import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Verify from "./components/Verify";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddChat from "./components/Addchat";
import ChatPage from "./components/Chatpage";
import ViewProfile from "./components/viewprofile";

function App() {
  const [profile, setProfile] = useState(null);
  const [name,setName]=useState("")
  const location = useLocation(); 
  const isChatPage = location.pathname.startsWith("/chatpage");
console.log(profile);

  return (
    <>
      {profile && !isChatPage && <Nav profile={profile} setName={setName} />}
      <Routes>
        <Route path="/" element={<Home setProfile={setProfile} name={name} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addchat" element={<AddChat/>}/>
        <Route path="/chatpage/:id" element={<ChatPage/>}/>
        <Route path="/viewprofile/:id" element={<ViewProfile/>}/>
        </Routes>
    </>
  );
}

function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default WrappedApp;
