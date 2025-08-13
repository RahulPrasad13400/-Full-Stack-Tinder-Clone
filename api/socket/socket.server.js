import { Server } from "socket.io";

let io;

const connectedUsers = new Map()

export const initializeSocket = (httpServer) => {
    io = new Server(httpServer,{
        cors : {
            origin : process.env.CLIENT_URL,
            credentials : true
        }
    })

    io.use((socket, next)=>{
        const userId = socket.handshake.auth.userId
        if(!userId) return next(new Error("Invalid user id"))

        socket.userId = userId
        next()
    })

    io.on("connection",(socket)=>{
        connectedUsers.set(socket.userId, socket.id)

        socket.on("disconnect", ()=>{
            connectedUsers.delete(socket.userId)
        })
    })
}

export const getIO = () => {
    if(!io){
        throw new Error("socket io not initialized")
    }
    return io
}

export const getConnectedUsers = () => {
    return connectedUsers
}