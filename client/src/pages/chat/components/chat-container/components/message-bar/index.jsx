import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
const messagebar = () => {
  const emojiref = useRef();
  const [message, setmessage] = useState("");
  const [showemoji, setshowemoji] = useState(false);

  const handleaddemoji = (emoji) => {
    setmessage((message) => message+ emoji.emoji);
  };

  const handlesendmsg = async () => {};

  useEffect(()=>{
           function handleclickoutside(e){
            if(emojiref.current && !emojiref.current.contains(e.target)){
              setshowemoji(false)
            }
           }
           document.addEventListener("mousedown",handleclickoutside)
           return ()=>{
            document.removeEventListener("mousedown",handleclickoutside)
           }
  },[emojiref])

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => setshowemoji(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiref}>
            <EmojiPicker theme="dark" open={showemoji} onEmojiClick={handleaddemoji} autoFocusSearch={false}/>
          </div>
        </div>
      </div>
      <button
        className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus: focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
        onClick={handlesendmsg}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default messagebar;
