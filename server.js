const app = require("./app")
const server = require('http').createServer(app)
require("./config/socket.config")(server)

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log(`Server (●'◡'●) listening on http://localhost:${PORT}`);
})
