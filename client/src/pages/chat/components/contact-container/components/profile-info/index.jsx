import { useAppStore } from "@/store";
import React from "react";
import HOST from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import axios from "axios";
import { Tooltip } from "react-tooltip";

function index() {
  const { userInfo ,setuserinfo} = useAppStore();
  const navigate = useNavigate()

const handleLogout = async() => {
     try {
        const response = await axios.post(`${HOST}/api/auth/logout`,{},{withCredentials:true})
        if(response.status === 200){
            navigate('/auth')
        }
        setuserinfo(null);
     } catch (error) {
        console.log(error)
     }
}
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-around w-full bg-[#2a2b33]">
      <div className="flex items-center justify-center">
        <div className="w-14 h-12 relative">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden">
            {userInfo.images ? (
              <img
                src={`${HOST}/${userInfo.images}`}
                alt="Profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-10 w-10 md:h-12 md:w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </div>
        </div>
        <div className="text-sm">
        {
            userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
        }
        </div>
      </div>
      <div className="flex gap-5">
        <CiEdit className="h-6 w-6 text-[#8417ff] cursor-pointer" onClick={()=>navigate('/profile')} data-tooltip-id="edit"/>
        <IoPowerSharp className="h-6 w-6 text-red-700 cursor-pointer" onClick={handleLogout} data-tooltip-id="logout"/>
        <Tooltip id="edit" content="Edit Profile"/>
        <Tooltip id="logout" content="Logout"/>
      </div>
    </div>
  );
}

export default index;
