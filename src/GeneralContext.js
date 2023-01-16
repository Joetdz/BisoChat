import { createContext } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:35000");

const generalContext = createContext();

export { generalContext, socket };
