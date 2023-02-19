import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = "http://localhost:5000";
const socket = io(SOCKET_URL);

const AppContext = React.createContext();

export { AppContext, socket };
