
import './App.css';
import ChessBoard from "./ChessBoard";
import TurnShow from "./TurnShow";
import GameArea from "./GameArea";
import DeadPieces from "./DeadPieces";
import ChooseRoomName from "./ChooseRoomName";
import PlayerBar from "./PlayerBar";
import React, {useState, useRef, useEffect} from "react";


import socketClient  from "socket.io-client";
const SERVER = "http://localhost:8080";

var socket = socketClient(SERVER);


var initboard = [];



function App() {


  

const [display, setdisplay] = useState(true);
const [playernumber, setplayernumber] = useState("");
const [currentplayer, setcurrentplayer] = useState("1");
const [playernames, setplayernames] = useState([]);
const [playername, setplayername] = useState("");
const [currentplayername, setcurrentplayername] = useState("1");
const [player1dead, setplayer1dead] = useState([]);
const [player2dead, setplayer2dead] = useState([]);


// useEffect(() => {
//   console.log("NEW PLAYER");
 
// }, [currentplayer]);


socket.on("assignnames", (data) => {


  let newarr = playernames;

  newarr.push(data);

  setplayernames(newarr);

  console.log(playernames);
 
  setcurrentplayername(playernames[0][0]);
 


 });




function onUserNamePress(username){

  socket.emit("login", username);



  socket.on("playerid", (number, name) => {

   setplayernumber(number)
   setplayername(name);
   setdisplay(false);
  

 
  })





}

function onPlayerChange(_newplayer){
  if(currentplayer === "1"){

    socket.emit("getusername", 2);
    socket.on("recieveuser", (username) => {

      setcurrentplayername(username);

    });

    setcurrentplayer("2");
  }
  else{

    socket.emit("getusername", 1);
    socket.on("recieveuser", (username) => {

      setcurrentplayername(username);

    });
    setcurrentplayer("1");
  }

  socket.removeAllListeners("getusername"); 

  }



function onPieceKnockout(_piece, _player){
  
if(_player === "1"){
  setplayer1dead([...player1dead, _piece]);

}
if(_player === "2"){
  setplayer2dead([...player2dead, _piece]);
  
}

}







  return (
    <div className="App">
     
      <TurnShow currentplayer={currentplayer} currentplayername={currentplayername}></TurnShow>
      <ChooseRoomName onUserNamePress={onUserNamePress} display={display}></ChooseRoomName>
      <PlayerBar playernumber="1" playernames={playernames}></PlayerBar>
      <GameArea>
      <DeadPieces player="1" deadpieces={player1dead} key="1"></DeadPieces>
      <ChessBoard key="g1"  playernumber={playernumber} socket={socket} currentplayer={currentplayer} onPlayerChange={onPlayerChange} onPieceKnockout={onPieceKnockout}></ChessBoard>
      <DeadPieces player="2" deadpieces={player2dead} key="2"></DeadPieces>
      </GameArea>
      <PlayerBar playernumber="2" playernames={playernames}></PlayerBar>
    </div>
  );
}

export default App;
