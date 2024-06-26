import io from 'socket.io-client'
const SOCKET_URL = "http://127.0.0.1:8001"

class WSService {
    initializeSocket = async() => {
        try {
            this.socket = io(SOCKET_URL,{
                transports:['websocket']
            })

            console.log("Initializing socket", this.socket);

            await this.socket.on("connect",(data) => {
                console.log("socket connected");
                
            })
            
            this.socket.on("disconnect",(data: any) => {
                console.log("socket disconnected");
                
            })
            
            this.socket.on("error",(data: any) => {
                console.log("socket error",data);
                
            })
            
        } catch (error) {
            console.log("socket is not initialized",error);
            
        }
    }
    
    emit(event, data = {}) {
        this.socket.emit(event, data)
    }

    on(event, cb) {
        this.socket.on(event,cb)
    }

    removeListener(listenerName) {
        this.socket.removeListener(listenerName)
    }
    socket: any;
}


const socketService = new WSService()
export default socketService