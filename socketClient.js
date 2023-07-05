import { io } from 'socket.io-client';
import { HTTP_SOCKET } from "@env"

let socketInstance = null;

export const getSocketInstance = async () => {
    if (!socketInstance) {
        //console.warn(HTTP_SOCKET);
        socketInstance = await io('http://103.179.173.184:3000/');
    }
    return socketInstance;
};

