const app = require("./app")
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 5005;

http.listen(PORT, () => {
  console.log(`Server (●'◡'●) listening on http://localhost:${PORT}`);
})

io.on('connection', (socket) => {
  console.log('New user connected')

  socket.on('clientConnected', () => {
    console.log('Client connected:', socket.id)
  })

  socket.on("sendNotification", (data) => {
    io.emit("getNotification", data)
  })
})