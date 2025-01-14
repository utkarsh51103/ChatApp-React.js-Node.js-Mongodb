import { createContext, useContext, useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import HOST from "@/utils/constants";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Socket Connected");
      });

      const handleRecievemessage = (message) => {
        const { selectedChatData, selectedChatType, addMessage} = useAppStore.getState();

        if (
          selectedChatType !== undefined &&
          (selectedChatData.id === message.sender.id ||
            selectedChatData.id === message.recipient.id)
        ) {
            console.log("Recieve Message",message)
            addMessage(message);
        }
      };

      socket.current.on("recieveMessage", handleRecievemessage);

      return () => {
        socket.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
