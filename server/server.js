const cors = require("cors");
const http = require("http");
const port = process.env.PORT || 8080;
const path = require("path"),
  express = require("express"),
  bodyParser = require("body-parser"),
  exampleRouter = require("./routes/examples.server.routes");
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

const server =(app.listen(port, () => console.log(`Server now running on port ${port}!`)));

const options ={
    cors:true,
    origins:["http://localhost:3000"],
   }


const io = require("socket.io")(server, options);



var players = [];
var playernames = [];
var playercount = 0;
var currentboarddata;



io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    
   
    //socket.emit("player", playercount);

    socket.on("disconnect", (data) => {

        playercount = 0;
        playernames = [];
        console.log("disconnected");
    });


    socket.on("getusername", (data) => {

        console.log(data);
        
        console.log(playernames[0], playernames[1]);
        if(data == "1"){
            socket.emit("recieveuser", playernames[0])
        }
        
        if(data == "2"){
            socket.emit("recieveuser", playernames[1])
        }
    })

    socket.once("login", (data) => {
        console.log("Welcome player " + playercount);
        players.push(playercount++);
        playernames.push(data);
        socket.emit("assignnames", playernames);
        socket.emit("playerid", playercount);

    });

    

    socket.on("changeboard", (msg) => {
        console.log(playernames);
        currentboarddata = msg;
        console.log(currentboarddata);
        io.emit("getboard", currentboarddata);  
        socket.removeAllListeners("getboard");  
    });
  
    

});
