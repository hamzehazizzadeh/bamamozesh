const socket = require("socket.io");

const User = require("../../models/User/User");

const { verifyToken } = require("../../middlewares/authorization");
const { userRoleItems } = require("../enum");

exports.initialSocketIO = (server) => {
  const io = socket(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 3000,
    timeout: 20000,
    transports: ["websocket"],
  });

  global.socketIO = io;
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    //* Start User Connection
    this.connectUser(socket);
    this.closeUser(socket);
    this.disconnectUser(socket);
    this.reconnectUser(socket);
    //* End User Connection
  });
};

exports.connectUser = (socket) => {
  socket.on("connect-user", (token) => {
    try {
      const userData = verifyToken(token);
      const key = userData.uid;

      if (!onlineUsers.has(key)) onlineUsers.set(key, new Set());
      onlineUsers.get(key).add(socket.id);
    } catch (error) {
      console.log(error);
    }
  });
};

exports.closeUser = (socket) => {
  socket.on("close-user", (token) => {
    try {
      const userData = verifyToken(token);
      const key = userData.uid;
      if (onlineUsers.has(key)) onlineUsers.delete(key);
    } catch (error) {
      console.log(error);
    }
  });
};

exports.disconnectUser = (socket) => {
  socket.on("disconnect", () => {
    for (const [userId, socketIds] of onlineUsers.entries()) {
      if (socketIds.has(socket.id)) {
        socketIds.delete(socket.id);
        if (socketIds.size === 0) onlineUsers.delete(userId);
        break;
      }
    }
  });
};

exports.reconnectUser = (socket) => {
  socket.on("reconnect", () => {
    for (const [userId, socketIds] of onlineUsers.entries()) {
      if (socketIds.has(socket.id)) {
        break;
      }
    }
  });
};

exports.sendUserListener = (id, listener, data) => {
  const userSockets = onlineUsers.get(id);
  if (userSockets)
    userSockets.forEach((socketId) => {
      socketIO.to(socketId).emit(listener, data);
    });
};

exports.sendAllUserListener = (listener, data) => {
  socketIO.emit(listener, data);
};

exports.handleSendAdminsListener = async (id, listener, data) => {
  const users = await User.find({
    ...(id && { _id: { $ne: id } }),
    role: userRoleItems[0],
  }).distinct("_id");

  for (const user of users) {
    const uid = user?.toString();
    if (global.onlineUsers.has(uid)) this.sendUserListener(uid, listener, data);
  }
};
