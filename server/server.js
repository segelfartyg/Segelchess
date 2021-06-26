const cors = require("cors");
const http = require("http");
const port = process.env.PORT || 8080;
const path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  exampleRouter = require("./routes/examples.server.routes");
const { emit } = require("process");
const socketio = require("socket.io");

const app = express();

app.use(bodyParser.json());

app.use("/api/example", exampleRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "./../client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./../client/build", "index.html"));
  });
}

const server = app.listen(port, () =>
  console.log(`Server now running on port ${port}!`)
);

const options = {
  cors: true,
  origins: ["http://localhost:3000"],
};

const io = require("socket.io")(server, options);

var players = [];
var playernames = [];

var currentboarddata1;
var currentboarddata2;
var currentboarddata3;

var playernumber1 = true;
var playernumber2 = true;
var playernumber3 = true;

var room1players = [];
var room2players = [];
var room3players = [];

var playercount1 = 0;
var playercount2 = 0;
var playercount3 = 0;

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */


var userId = Math.random() * 10;



  socket.emit("sendplayersinrooms", [
    room1players.length,
    room2players.length,
    room3players.length,
  ]);
  //socket.emit("player", playercount);

  

  socket.on("setcurrent", (room) => {
    let temp;

    switch (room) {
      case 1:
        if (playernumber1) {
          temp = "2";
          playernumber1 = false;
        } else {
          temp = "1";
          playernumber1 = true;
        }
        break;

      case 2:
        if (playernumber2) {
          temp = "2";
          playernumber2 = false;
        } else {
          temp = "1";
          playernumber2 = true;
        }
        break;

      case 3:
        if (playernumber3) {
          temp = "2";
          playernumber3 = false;
        } else {
          temp = "1";
          playernumber3 = true;
        }
        break;
    }
    console.log(temp);
    socket.emit("sendcurrentplayer", temp);
  });

  socket.on("login", (username, room) => {
    socket.join(room);
    socket.username = username;
    switch (room) {
      case 1:
        room1players.push(username);
        io.emit("playerjoined", 1);
        console.log("Welcome player " + playercount1);
        players.push(playercount1++);
        io.to(room).emit("assignnames", room1players);
        socket.emit("playerid", playercount1);
        socket.emit("sendroom", 1);

        if (room1players.length === 2) {
          io.to(room).emit("assignnewcurrent", room1players[0]);
        }

        break;
      case 2:
        room2players.push(username);
        io.emit("playerjoined", 2);
        console.log("Welcome player " + playercount2);
        players.push(playercount2++);

        io.to(room).emit("assignnames", room2players);
        socket.emit("playerid", playercount2);
        socket.emit("sendroom", 2);

        if (room2players.length === 2) {
          io.to(room).emit("assignnewcurrent", room2players[0]);
        }

        break;
      case 3:
        room3players.push(username);
        io.emit("playerjoined", 3);
        console.log("Welcome player " + playercount3);
        players.push(playercount3++);

        io.to(room).emit("assignnames", room3players);
        socket.emit("playerid", playercount3);
        socket.emit("sendroom", 3);

        if (room3players.length === 2) {
          io.to(room).emit("assignnewcurrent", room3players[0]);
        }

        break;
      default:
        break;
    }

    io.emit("sendplayersinrooms", [
      room1players.length,
      room2players.length,
      room3players.length,
    ]);

    console.log("Room 1: ", room1players);
    console.log("Room 2: ", room2players);
    console.log("Room 3: ", room3players);

    //playernames.push(username);
  });

  socket.on("changeboard", (room, board) => {
    switch (room) {
      case 1:
        if (playernumber1) {
          playernumber1 = false;
        } else {
          playernumber1 = true;
        }
        currentboarddata1 = board;

        io.emit("getboard", 1, currentboarddata1);
        io.emit("sendcurrentplayer", 1, playernumber1);
        if (playernumber1) {
          console.log(room1players[0]);
          io.to(room).emit("assignnewcurrent", room1players[0]);
        } else {
          console.log(room1players[1]);
          io.to(room).emit("assignnewcurrent", room1players[1]);
        }

        socket.removeAllListeners("getboard");
        break;
      case 2:
        if (playernumber2) {
          playernumber2 = false;
        } else {
          playernumber2 = true;
        }
        currentboarddata2 = board;

        io.emit("getboard", 2, currentboarddata2);
        io.emit("sendcurrentplayer", 2, playernumber2);
        if (playernumber2) {
          console.log(room2players[0]);
          io.to(room).emit("assignnewcurrent", room2players[0]);
        } else {
          console.log(room2players[1]);
          io.to(room).emit("assignnewcurrent", room2players[1]);
        }

        socket.removeAllListeners("getboard");
        break;
      case 3:
        if (playernumber3) {
          playernumber3 = false;
        } else {
          playernumber3 = true;
        }
        currentboarddata3 = board;

        io.emit("getboard", 3, currentboarddata3);
        io.emit("sendcurrentplayer", 3, playernumber3);
        if (playernumber3) {
          console.log(room3players[0]);
          io.to(room).emit("assignnewcurrent", room3players[0]);
        } else {
          console.log(room3players[1]);
          io.to(room).emit("assignnewcurrent", room3players[1]);
        }
        socket.removeAllListeners("getboard");
        break;
    }
  });

  socket.on("disconnect", (data) => {
    
  
    console.log(socket.username);


   
room1players = room1players.filter(e => e !== socket.username);
room2players = room2players.filter(e => e !== socket.username);
room3players = room3players.filter(e => e !== socket.username);

playernumber1 = true;
playernumber2 = true;
playernumber3 = true;


playercount1 = 0;
playercount2 = 0;
playercount3 = 0;

console.log(room1players);
    console.log("disconnected");
  });




});
