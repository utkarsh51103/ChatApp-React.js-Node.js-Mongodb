import React from "react";
import { RiCloseFill } from "react-icons/ri";

const chatheader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] fleex items-center justify-between px-20">
      <div className="felx gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
             <RiCloseFill className="text-3xl"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default chatheader;