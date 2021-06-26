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

const server =(app.listen(port, () => console.log(`Server now running on port ${port}!`)));

const options ={
    cors:true,
    origins:["http://localhost:3000"],
   }


const io = require("socket.io")(server, options);



var players = [];
var playernames = [];

var currentboarddata1;
var currentboarddata2;
var currentboarddata3;

var room1players = [];
var room2players = [];
var room3players = [];

var playercount1 = 0;
var playercount2 = 0;
var playercount3 = 0;

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    
   
    socket.emit("sendplayersinrooms", [room1players.length, room2players.length, room3players.length]);
    //socket.emit("player", playercount);

    socket.on("disconnect", (data) => {
        playercount = 0;
        playernames = [];
        console.log("disconnected");
    });


  

 


    socket.on("getusername", (data) => {

   
        if(data == "1"){
            socket.emit("recieveuser", playernames[0])
        }
        
        if(data == "2"){
            socket.emit("recieveuser", playernames[1])
        }
    })

    socket.on("login", (username, room) => {
      
      socket.join(room);

     
   
     
      

       switch(room){

            case 1: 
            room1players.push(username);
            io.emit("playerjoined", 1);
            console.log("Welcome player " + playercount1);
            players.push(playercount1++);
            io.to(room).emit("assignnames", room1players);
            socket.emit("playerid", playercount1);
            socket.emit("sendroom", 1);
         

            break;
            case 2: 
            room2players.push(username);
            io.emit("playerjoined", 2);
            console.log("Welcome player " + playercount2);
            players.push(playercount2++);
            
            io.to(room).emit("assignnames", room2players);
            socket.emit("playerid", playercount2);
            socket.emit("sendroom", 2);

       

            break;
            case 3:
            room3players.push(username);
            io.emit("playerjoined", 3);
            console.log("Welcome player " + playercount3);
            players.push(playercount3++);
           
            io.to(room).emit("assignnames", room3players);
            socket.emit("playerid", playercount3);
            socket.emit("sendroom", 3);
      
            break;
            default:
            break;
       }

       
       io.emit("sendplayersinrooms", [room1players.length, room2players.length, room3players.length]);

        console.log("Room 1: ", room1players);
        console.log("Room 2: ", room2players);
        console.log("Room 3: ", room3players);
        
        //playernames.push(username);
        
      

      

    });

    

    socket.on("changeboard", (room, board) => {
       

        switch(room){

            case 1:
                currentboarddata1 = board;
                console.log(currentboarddata1);
                io.emit("getboard", 1, currentboarddata1);  
                socket.removeAllListeners("getboard");  
            break;
            case 2:
                currentboarddata2 = board;
                console.log(currentboarddata2);
                io.emit("getboard", 2, currentboarddata2);  
                socket.removeAllListeners("getboard");  
            break;
            case 3:
                currentboarddata3 = board;
                console.log(currentboarddata3);
                io.emit("getboard", 3, currentboarddata3);  
                socket.removeAllListeners("getboard");  
            break;



        }
        
    });
  
    

});
