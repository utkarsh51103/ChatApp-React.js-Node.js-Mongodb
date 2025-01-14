import { Server as SocketIOServer } from "socket.io";
import Message from "./models/messageSchema.js";

const setupsocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    const sendSocketID = userSocketMap.get(message.sender);
    const recipientSocketID = userSocketMap.get(message.recipient);

    const createdmessage = await Message.create(message);

    const messageData = await Message.findById(createdmessage.id)
      .populate("sender", "id email firstName lastName image color")
      .populate("recipient", "id email firstName lastName image color");

    if (recipientSocketID) {
      io.to(recipientSocketID).emit("recieveMessage", messageData);
    }
    if (sendSocketID) {
      io.to(sendSocketID).emit("recieveMessage", messageData);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User Connected: ${userId} with Socket ID: ${socket.id}`);
    } else {
      console.log("User ID not provided during Connection");
    }

    socket.on("sendMessage", sendMessage);

    socket.on("disconnect", () => {
      disconnect(socket);
    });
  });
};

export default setupsocket;
