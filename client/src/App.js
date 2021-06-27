import "./App.css";
import ChessBoard from "./ChessBoard";
import TurnShow from "./TurnShow";
import GameArea from "./GameArea";
import DeadPieces from "./DeadPieces";
import ChooseRoomName from "./ChooseRoomName";
import PlayerBar from "./PlayerBar";
import React, { useState, useRef, useEffect } from "react";
import LastRow from "./LastRow";

import socketClient from "socket.io-client";
const SERVER = "/";
var socket = socketClient(SERVER);

var initboard = [];

function App() {
  const [inside, setinside] = useState([0, 0, 0]);
  const [display, setdisplay] = useState(true);
  const room = useRef("");
  const [playernumber, setplayernumber] = useState("");
  const currentplayer = useRef("1");
  const [playernames, setplayernames] = useState([]);
  const [playername, setplayername] = useState("");
  const [currentplayername, setcurrentplayername] = useState("");
  const [player1dead, setplayer1dead] = useState([]);
  const [player2dead, setplayer2dead] = useState([]);
  const [turnshow, setturnshow] = useState(false);

  // useEffect(() => {
  //   console.log("NEW PLAYER");

  // }, [currentplayer]);

  socket.off("assignnewcurrent").on("assignnewcurrent", (data) => {
    setcurrentplayername(data);
  });

  socket.off("assignnames").on("assignnames", (roomplayers) => {
    setplayernames(roomplayers);
  });

  socket.off("sendroom").on("sendroom", (currentroom) => {
    room.current = currentroom;
    console.log("Client connected to: " + room.current);
  });

  socket
    .off("sendplayersinrooms")
    .on("sendplayersinrooms", (playersinrooms) => {
      console.log(playersinrooms);
      setinside(playersinrooms);
    });

  function onUserNamePress(username, room) {
    socket.emit("login", username, room);

    socket.on("playerid", (number, name) => {
      setplayernumber(number);
      setplayername(name);
      setdisplay(false);
    });
  }


  socket.off("leavelobby").on("leavelobby", (data) => {

console.log("you friend left lobby");

  });



  function onPlayerChange(_newplayer) {
    // socket.emit("setcurrent", room.current);

    socket.off("sendcurrentplayer").on("sendcurrentplayer", (_room, player) => {
      let pnumber;

      if (room.current == _room) {
        if (player) {
          pnumber = "1";
        } else {
          pnumber = "2";
        }
      }

      currentplayer.current = pnumber;
    });
  }

  function onPieceKnockout(_piece, _player) {
    if (_player === "1") {
      setplayer1dead([...player1dead, _piece]);
    }
    if (_player === "2") {
      setplayer2dead([...player2dead, _piece]);
    }
  }

  function onShowTurnShow(){
    setturnshow(true);
  }

  return (
    <div className="App">
      <ChooseRoomName
        showTurnShow={onShowTurnShow}
        onUserNamePress={onUserNamePress}
        display={display}
        inside={inside}
      ></ChooseRoomName>
      <PlayerBar playernumber="1" playernames={playernames}></PlayerBar>
      <GameArea>
        <DeadPieces player="1" deadpieces={player1dead} key="1"></DeadPieces>
        <ChessBoard
          key="g1"
          room={room}
          playernumber={playernumber}
          socket={socket}
          currentplayer={currentplayer}
          onPlayerChange={onPlayerChange}
          onPieceKnockout={onPieceKnockout}
        ></ChessBoard>
        <DeadPieces player="2" deadpieces={player2dead} key="2"></DeadPieces>
      </GameArea>
      <LastRow>
      <TurnShow
        show={turnshow}
        currentplayer={currentplayer.current}
        currentplayername={currentplayername}
      ></TurnShow>
      <PlayerBar playernumber="2" playernames={playernames}></PlayerBar>
      </LastRow>
    </div>
  );
}

export default App;
