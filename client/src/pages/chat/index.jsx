import { useAppStore } from "@/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        <div>
            {userInfo.lastName} {userInfo.firstName}
        </div>
    );
}

export default chat;