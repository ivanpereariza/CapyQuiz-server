const socket = (server) => {
    const io = require('socket.io')(server, {
        cors: {
            origin: [process.env.ORIGIN]
        }
    })

    io.on('connect', (socket) => {
        console.log('New user connected')

        socket.on('clientConnected', () => {
            console.log('Client connected:', socket.id)
        })

        socket.on("sendNotification", (data) => {
            io.emit("getNotification", data)
        })
    })
}

module.exports = socket