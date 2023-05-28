import { io } from 'socket.io-client';
import { HTTP_SOCKET } from "@env"

let socketInstance = null;

export const getSocketInstance = async () => {
    if (!socketInstance) {
        //console.warn(HTTP_SOCKET);
        socketInstance = await io('https://6a83-1-52-185-80.ap.ngrok.io');
    }
    return socketInstance;
};

