import { useAppStore } from "@/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ContactContainer from "./components/contact-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

function chat() {

    const {userInfo} = useAppStore()
   const navigate = useNavigate()
   useEffect(()=>{
     if(!userInfo.profilesetup){
        toast.error("Please setup your profile")
        navigate("/profile")
     }
   },[])

    return (
        <div className="flex h-[100vh] text-white overflow-hidden">
        <ContactContainer/>
        <EmptyChatContainer/>
        <ChatContainer/>
        </div>
    );
}

export default chat;