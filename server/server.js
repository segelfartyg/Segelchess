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
  app.use(express.static(path.join(__dirname, "./../client/build")));

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

var deadpieces1 = [];
var deadpieces2 = [];
var deadpieces3 = [];

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

  socket.emit("sendplayersinrooms", [
    room1players.length,
    room2players.length,
    room3players.length,
  ]);
  //socket.emit("player", playercount);

  socket.on("login", (username, room) => {
    var userId = Math.random() * 10;

    switch (room) {
      case 1:
        if (room1players.length <= 1) {
          socket.join(room);
          socket.username = username + "_" + userId;

          room1players.push(username + "_" + userId);
          io.emit("playerjoined", 1);
          console.log("Welcome player " + playercount1);
          players.push(playercount1++);
          io.to(1).emit("assignnames", room1players);
          socket.emit("playerid", playercount1);
          socket.emit("sendroom", 1);

          io.to(1).emit("showturnshow");
        } else {
          socket.emit("dontshowturnshow");
        }
        if (room1players.length === 2) {
          io.to(1).emit("assignnewcurrent", room1players[0]);
        }
        break;

      case 2:
        if (room2players.length <= 1) {
          socket.join(room);
          socket.username = username + "_" + userId;

          room2players.push(username + "_" + userId);
          io.emit("playerjoined", 1);
          console.log("Welcome player " + playercount2);
          players.push(playercount2++);
          io.to(2).emit("assignnames", room2players);
          socket.emit("playerid", playercount2);
          socket.emit("sendroom", 2);

          io.to(2).emit("showturnshow");
        } else {
          socket.emit("dontshowturnshow");
        }
        if (room2players.length === 2) {
          io.to(2).emit("assignnewcurrent", room2players[0]);
        }
        break;

      case 3:
        if (room3players.length <= 1) {
          socket.join(room);
          socket.username = username + "_" + userId;

          room3players.push(username + "_" + userId);
          io.emit("playerjoined", 3);
          console.log("Welcome player " + playercount3);
          players.push(playercount3++);
          io.to(3).emit("assignnames", room3players);
          socket.emit("playerid", playercount3);
          socket.emit("sendroom", 3);

          io.to(3).emit("showturnshow");
        } else {
          socket.emit("dontshowturnshow");
        }
        if (room3players.length === 2) {
          io.to(3).emit("assignnewcurrent", room3players[0]);
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

    //playernames.push(username);
  });

  socket.on("deadpiece", (deadpiece) => {
    if (socket.rooms.has(1)) {
      console.log("RUM1!");

      if (deadpiece.slice(-1) == "1") {
        deadpieces1.push(deadpiece);
        io.to(1).emit("senddeadpieces", deadpieces1);
      }

      if (deadpiece.slice(-1) == "2") {
        deadpieces1.push(deadpiece);
        io.to(1).emit("senddeadpieces", deadpieces1);
      }
    }

    if (socket.rooms.has(2)) {
      console.log("RUM2!");

      if (deadpiece.slice(-1) == "1") {
        deadpieces2.push(deadpiece);
        io.to(2).emit("senddeadpieces", deadpieces2);
      }

      if (deadpiece.slice(-1) == "2") {
        deadpieces2.push(deadpiece);
        io.to(2).emit("senddeadpieces", deadpieces2);
      }
    }

    if (socket.rooms.has(3)) {
      console.log("RUM3!");

      if (deadpiece.slice(-1) == "1") {
        deadpieces3.push(deadpiece);
        io.to(3).emit("senddeadpieces", deadpieces3);
      }

      if (deadpiece.slice(-1) == "2") {
        deadpieces3.push(deadpiece);
        io.to(3).emit("senddeadpieces", deadpieces3);
      }
    }
  });

  socket.on("changecurrentplayer", (room) => {});

  socket.on("changeboard", (room, board) => {
    console.log("THE ROOM THAT WILL BE CHANGED IS: " + room);

    switch (room) {
      case 1:
        currentboarddata1 = board;

        if (playernumber1) {
          io.to(room).emit("assignnewcurrent", room1players[1]);

          playernumber1 = false;
        } else {
          io.to(room).emit("assignnewcurrent", room1players[0]);

          playernumber1 = true;
        }
        console.log(playernumber1);
        io.emit("getboard", 1, currentboarddata1, playernumber1);
        socket.removeAllListeners("getboard");
        break;
      case 2:
        currentboarddata2 = board;

        if (playernumber2) {
          io.to(room).emit("assignnewcurrent", room2players[1]);

          playernumber2 = false;
        } else {
          io.to(room).emit("assignnewcurrent", room2players[0]);

          playernumber2 = true;
        }
        io.emit("getboard", 2, currentboarddata2, playernumber2);
        socket.removeAllListeners("getboard");
        break;
      case 3:
        currentboarddata3 = board;

        if (playernumber3) {
          io.to(room).emit("assignnewcurrent", room3players[1]);

          playernumber3 = false;
        } else {
          io.to(room).emit("assignnewcurrent", room3players[0]);

          playernumber3 = true;
        }
        console.log(playernumber3);
        io.emit("getboard", 3, currentboarddata3, playernumber3);
        socket.removeAllListeners("getboard");
        break;
    }
  });

  socket.on("disconnect", (data) => {
    var temp1 = room1players;
    room1players = room1players.filter((e) => e != socket.username);

    if (room1players.length < temp1.length) {
      playernumber1 = true;
      playercount1 = 0;
      io.to(1).emit("leavelobby");
    }

    var temp2 = room2players;
    room2players = room2players.filter((e) => e != socket.username);

    if (room2players.length < temp2.length) {
      playernumber2 = true;
      playercount2 = 0;
      io.to(2).emit("leavelobby");
    }

    var temp3 = room3players;
    room3players = room3players.filter((e) => e != socket.username);

    if (room3players.length < temp3.length) {
      playernumber3 = true;
      playercount3 = 0;
      io.to(3).emit("leavelobby");
    }

    console.log(room1players);
  });
});
