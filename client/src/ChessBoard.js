import React, { useState, useEffect, useRef } from "react";
import "./ChessBoard.css";
import ChessRow from "./ChessRow";
import ChessNode from "./ChessNode";
import socketClient  from "socket.io-client";







export default function ChessBoard(props) {


  var board = [];
  

  props.socket.removeAllListeners("getboard");  

  
  props.socket.on("getboard", (room, data) => {

    if(room == props.room.current){
      setgameBoard(data.board);
      p1Positions.current = data.p1.current;
      p2Positions.current = data.p2.current;
      props.onPlayerChange();
      reRender([]);
    }
  
  });
 
 

  
  
  function onBoardSend(_board, _p1positions, _p2positions){
    
    console.log(props.room.current);

    props.socket.emit("changeboard", props.room.current, { board: _board, p1: _p1positions, p2: _p2positions });
    
  
  
  }



  
 
  var colored = [];
  var available = [];

  const current = useRef(props.currentplayer.current);

  const vertical = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const horisontal = ["1", "2", "3", "4", "5", "6", "7", "8"];

  
  let whitetiles = [];
  let iswhite = false;

  for(let i = 0; i < vertical.length; i++){
    for(let j = 0; j <= horisontal.length; j++){
      if(iswhite){
        if(horisontal[j] !== undefined){
          whitetiles.push(vertical[i] + horisontal[j]);
        } 
        iswhite = false;
      }
      else{
        iswhite = true;
      }
    }
  }



  const p1Positions = useRef({
    piecep11: "b1",
    piecep21: "b2",
    piecep31: "b3",
    piecep41: "b4",
    piecep51: "b5",
    piecep61: "b6",
    piecep71: "b7",
    piecep81: "b8",
    piecet11: "a1",
    pieceh11: "a2",
    piecel11: "a3",
    piecek1: "a4",
    pieceq1: "a5",
    piecel21: "a6",
    pieceh21: "a7",
    piecet21: "a8",
  });

  const p2Positions = useRef({
    piecep12: "g1",
    piecep22: "g2",
    piecep32: "g3",
    piecep42: "g4",
    piecep52: "g5",
    piecep62: "g6",
    piecep72: "g7",
    piecep82: "g8",
    piecet12: "h1",
    pieceh12: "h2",
    piecel12: "h3",
    piecek2: "h5",
    pieceq2: "h4",
    piecel22: "h6",
    pieceh22: "h7",
    piecet22: "h8",
  });

  // INIT BOARD

 

  for (let i = 0; i < horisontal.length; i++) {
    for (let j = 0; j < vertical.length; j++) {
      if(whitetiles.includes(vertical[i] + horisontal[j])){
        board.push(vertical[i] + horisontal[j] + "_white");
      }
      else{
        board.push(vertical[i] + horisontal[j] + "_black");
      }
     
    }
  }

  
  var gameBoardinit = board;

  const [gameBoard, setgameBoard] = useState(board);


  




  // RERENDERS THE BOARD

  function reRender(_colored, _rerender) {
    board = [];

    var color = "yellow";
    var found = false;

    for (let i = 0; i < horisontal.length; i++) {
      for (let j = 0; j < vertical.length; j++) {
        if (_colored.length > 0) {
          for (let k = 0; k < _colored.length; k++) {
            if ("g_" + vertical[i] + horisontal[j] === _colored[k]) {
              board.push(vertical[i] + horisontal[j] + "_green");
              found = true;
              break;
            }
            if ("r_" + vertical[i] + horisontal[j] === _colored[k]) {
              board.push(vertical[i] + horisontal[j] + "_red");
              found = true;
              break;
            }
          }
        }

        if (!found) {
          if(whitetiles.includes(vertical[i] + horisontal[j])){
            board.push(vertical[i] + horisontal[j] + "_white");
          }
          else{
            board.push(vertical[i] + horisontal[j] + "_black");
          }
        }
        found = false;
      }
    }

    
    setgameBoard(board);

    //CHANGE PLAYER

    



  }

  //CHECKS WETHER A NODE IS A PIECE OR A REGULAR TILE

  function isPiece(__node) {
    var _node = __node.split("_")[0];

    for (let [key, value] of Object.entries(p1Positions.current)) {
      if (_node === value) {
        return key;
      }
    }
    for (let [key, value] of Object.entries(p2Positions.current)) {
      if (_node === value) {
        return key;
      }
    }
    return _node;
  }

  // CHECKS IF A NODE IS OCCUPIED BY ANOTHER PIECE

  function isOccu(_letter, _number) {
    var _node = _letter + _number;

    for (let [key, value] of Object.entries(p1Positions.current)) {
      if (_node === value) {
        return key;
      }
    }
    for (let [key, value] of Object.entries(p2Positions.current)) {
      if (_node === value) {
        return key;
      }
    }
    return null;
  }

  // GENERATES THE PEASANT-PIECE

  function oneTwoSteps(_node, _player) {

    let letter = _node.split("")[0];
    let number = _node.split("")[1];
    var c = [];

    if (_player === "1") {
     



      if (letter === "b") {
        if (isOccu(vertical[vertical.indexOf(letter) + 1], number) != null) {
         
        } else {
          c.push("g_" + vertical[vertical.indexOf(letter) + 1] + number);
          if (isOccu(vertical[vertical.indexOf(letter) + 2], number) != null) {
          } else {
            c.push("g_" + vertical[vertical.indexOf(letter) + 2] + number);
          }
        }
      } else {
        if (isOccu(vertical[vertical.indexOf(letter) + 1], number) != null) {

  
         
        } else {
          c.push("g_" + vertical[vertical.indexOf(letter) + 1] + number);
        }
      }
      
      if(isOccu(vertical[vertical.indexOf(letter) + 1], horisontal[horisontal.indexOf(number) + 1]) !== null){
        let tempCord = isOccu(vertical[vertical.indexOf(letter) + 1], horisontal[horisontal.indexOf(number) + 1]).slice(-1);
        if(tempCord !== _player.slice(-1)){
          c.push("r_" + vertical[vertical.indexOf(letter) + 1] + horisontal[horisontal.indexOf(number) + 1]);
        }
      }

      if(isOccu(vertical[vertical.indexOf(letter) + 1], horisontal[horisontal.indexOf(number) - 1]) !== null){
        let tempCord = isOccu(vertical[vertical.indexOf(letter) + 1], horisontal[horisontal.indexOf(number) - 1]).slice(-1);
        if(tempCord !== _player.slice(-1)){
          c.push("r_" + vertical[vertical.indexOf(letter) + 1] + horisontal[horisontal.indexOf(number) - 1]);
        }
      }


    }

    if (_player === "2") {
      if (letter === "g") {
        if (isOccu(vertical[vertical.indexOf(letter) - 1], number) != null) {
        
        } else {
          c.push("g_" + vertical[vertical.indexOf(letter) - 1] + number);
          if (isOccu(vertical[vertical.indexOf(letter) - 2], number) != null) {
          } else {
            c.push("g_" + vertical[vertical.indexOf(letter) - 2] + number);
          }
        }
      } else {
        if (isOccu(vertical[vertical.indexOf(letter) - 1], number) != null) {
         
        } else {
          c.push("g_" + vertical[vertical.indexOf(letter) - 1] + number);
        }
      }


      if(isOccu(vertical[vertical.indexOf(letter) - 1], horisontal[horisontal.indexOf(number) - 1]) !== null){

        let tempCord = isOccu(vertical[vertical.indexOf(letter) - 1], horisontal[horisontal.indexOf(number) - 1]).slice(-1);
        if(tempCord !== _player.slice(-1)){
          c.push("r_" + vertical[vertical.indexOf(letter) - 1] + horisontal[horisontal.indexOf(number) - 1]);
        }   
      };

      if(isOccu(vertical[vertical.indexOf(letter) - 1], horisontal[horisontal.indexOf(number) + 1]) !== null){
       
        let tempCord = isOccu(vertical[vertical.indexOf(letter) - 1], horisontal[horisontal.indexOf(number) + 1]).slice(-1);
        if(tempCord !== _player.slice(-1)){
          c.push("r_" + vertical[vertical.indexOf(letter) - 1] + horisontal[horisontal.indexOf(number) + 1]);
        }
      }
    }
    return c;
  }

  //GENERATES STRAIGHT LINES, USED BY TOWER AND QUEEN

  function straightLines(_node, _player) {
    var c = [];

    let letter = _node.split("")[0];
    let number = _node.split("")[1];

    //CHECKING TILES TO THE LEFT

    for (let i = horisontal.indexOf(number); i >= 0; i--) {
      if (horisontal[i] !== number) {
        if (isOccu(letter, horisontal[i]) != null) {
          //DO SOMETHING WITH PIECE
          
          let temppiece = isOccu(letter, horisontal[i]);
  

          if(temppiece.slice(-1) === _player.slice(-1)) {
            
           break;
          } else {
         
            c.push("r_" + letter + (i + 1));
            break;
          }
        } else {
          c.push("g_" + letter + (i + 1));
        }
      }
    }

    //CHECKING TILES TO THE RIGHT
    for (let i = horisontal.indexOf(number); i <= horisontal.length; i++) {
      if (horisontal[i] !== number) {
        if (isOccu(letter, horisontal[i]) != null) {

          let temppiece = isOccu(letter, horisontal[i]);
         
          if(temppiece.slice(-1) === _player.slice(-1)) {

            break;
          }
          else{
            c.push("r_" + letter + (i + 1));
            break;
          }

          //DO SOMETHING WITH PIECE
         
        } else {
          c.push("g_" + letter + (i + 1));
        }
      }
    }

    //CHECKING TILES UPWARDS

    for (let i = vertical.indexOf(letter); i >= 0; i--) {
      if (vertical[i] !== letter) {
        if (isOccu(vertical[i], number) != null) {
          //DO SOMETHING WITH PIECE

          let temppiece = isOccu(vertical[i], number);
       
          if(temppiece.slice(-1) === _player.slice(-1)) {

            break;
          }
          else{
            c.push("r_" + vertical[i] + number);
            break;
          }
         
        } else {
          c.push("g_" + vertical[i] + number);
        }
      }
    }

    //CHECKING TILES UPWARDS

    for (let i = vertical.indexOf(letter); i <= vertical.length; i++) {
      if (vertical[i] !== letter) {
        if (isOccu(vertical[i], number) != null) {
          //DO SOMETHING WITH PIECE


          let temppiece = isOccu(vertical[i], number);
       
          if(temppiece.slice(-1) === _player.slice(-1)) {

            break;
          }
          else{

            c.push("r_" + vertical[i] + number);
            break;
          }
        


        } else {
          c.push("g_" + vertical[i] + number);
        }
      }
    }
    return c;
  }

  // CHECKING ONE STEP IN EVERY DIRECTION

  function OneStep(_node, _player) {
    var c = [];

    let letter = _node.split("")[0];
    let number = _node.split("")[1];

    let up = vertical[vertical.indexOf(letter) - 1];
    let down = vertical[vertical.indexOf(letter) + 1];
    let right = horisontal[horisontal.indexOf(number) + 1];
    let left = horisontal[horisontal.indexOf(number) - 1];


   
    if (isOccu(up, number) == null) {
      c.push("g_" + up + number);
    } else {
      if(isOccu(up, number).slice(-1) === _player.slice(-1)){
    
      }
      else{
        c.push("r_" + up + number);
      }
      
    }

    if (isOccu(down, number) == null) {
      c.push("g_" + down + number);
    } else {
      if(isOccu(down, number).slice(-1) === _player.slice(-1)){
    
      }
      else{
        c.push("r_" + down + number);
      }
     
    }

    if (isOccu(letter, right) == null) {
      c.push("g_" + letter + right);
    } else {
      if(isOccu(letter, right).slice(-1) === _player.slice(-1)){
  
      }
      else{
        c.push("r_" + letter + right);
      }

    }

    if (isOccu(letter, left) == null) {
      c.push("g_" + letter + left);
    } else {
      if(isOccu(letter, left).slice(-1) === _player.slice(-1)){
       
      }
      else{
        c.push("r_" + letter + left);
      }
     
    }

    if (isOccu(up, left) == null) {
      c.push("g_" + up + left);
    } else {

      if(isOccu(up, left).slice(-1) === _player.slice(-1)){
     
      }
      else{
        c.push("r_" + up + left);
      }
  
      
    }

    if (isOccu(up, right) == null) {
      c.push("g_" + up + right);
    } else {
      if(isOccu(up, right).slice(-1) === _player.slice(-1)){
   
      }
      else{
        c.push("r_" + up + right);
      }
      
    }

    if (isOccu(down, right) == null) {
      c.push("g_" + down + right);
    } else {
      if(isOccu(down, right).slice(-1) === _player.slice(-1)){
       
      }
      else{
        c.push("r_" + down + right);
      }
    
    }

    if (isOccu(down, left) == null) {
      c.push("g_" + down + left);
    } else {
      if(isOccu(down, left).slice(-1) === _player.slice(-1)){
        
      }
      else{
        c.push("r_" + down + left);
      }
     
    }

    return c;
  }

  // CHECKING THE STEPS FOR THE HORSE

  function HorseStep(_node, _player) {
    var c = [];

    const letter = _node.split("")[0];
    const number = _node.split("")[1];

    const up = vertical[vertical.indexOf(letter) - 1];
    const up2 = vertical[vertical.indexOf(letter) - 2];
    const right = horisontal[horisontal.indexOf(number) + 1];
    const left = horisontal[horisontal.indexOf(number) - 1];
    const down = vertical[vertical.indexOf(letter) + 1];
    const down2 = vertical[vertical.indexOf(letter) + 2];
    const right2 = horisontal[horisontal.indexOf(number) + 2];
    const left2 = horisontal[horisontal.indexOf(number) - 2];

    //UP
    if (isOccu(up2, left) == null) {
      c.push("g_" + up2 + left);
    } else {

      if(isOccu(up2, left).slice(-1) === _player.slice(-1)){

        
      }
      else{
        c.push("r_" + up2 + left);
      }
    
      //DO SOMETHING WITH PIECE
    }

    if (isOccu(up2, right) == null) {
      c.push("g_" + up2 + right);
    } else {

      if(isOccu(up2, right).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + up2 + right);
      }
      

      //DO SOMETHING WITH PIECE
    }

    //DOWN

    if (isOccu(down2, left) == null) {
      c.push("g_" + down2 + left);
    } else {

      if(isOccu(down2, left).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + down2 + left);
      }
      

      //DO SOMETHING WITH PIECE
    }
    if (isOccu(down2, right) == null) {
      c.push("g_" + down2 + right);
    } else {

      if(isOccu(down2, right).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + down2 + right);
      }
   
      //DO SOMETHING WITH PIECE
    }

    //RIGHT
    if (isOccu(up, right2) == null) {
      c.push("g_" + up + right2);
    } else {
      if(isOccu(up, right2).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + up + right2);
      } 
      
      //DO SOMETHING WITH PIECE
    }

    if (isOccu(down, right2) == null) {
      c.push("g_" + down + right2);
    } else {

      if(isOccu(down, right2).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + down + right2);
      }
     
      //DO SOMETHING WITH PIECE
    }

    //LEFT
    if (isOccu(up, left2) == null) {
      c.push("g_" + up + left2);
    } else {

      if(isOccu(up, left2).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + up + left2);
      }
   
      //DO SOMETHING WITH PIECE
    }

    if (isOccu(down, left2) == null) {
      c.push("g_" + down + left2);
    } else {
      if(isOccu(down, left2).slice(-1) === _player.slice(-1)){

      }
      else{
        c.push("r_" + down + left2);
      }
    
      //DO SOMETHING WITH PIECE
    }

    return c;
  }

  // CHECKING DIAGONAL TILES

  function diagLines(_node, _player) {
    var c = [];

    let letter = _node.split("")[0];

    let number = _node.split("")[1];

    let numberindex = horisontal.indexOf(number);
    let letterindex = vertical.indexOf(letter);

    let count = 0;

    for (let i = number; i <= vertical.length; i++) {
      if (letter + number !== vertical[letterindex + count] + i) {
        if (isOccu(vertical[letterindex + count], i) != null) {

          let tempCord = isOccu(vertical[letterindex + count], i);

          if(tempCord.slice(-1) === _player.slice(-1)){

           break; 
          }
          else{
            c.push("r_" + vertical[letterindex + count] + i);
            break;
          }
        
        } else {
          c.push("g_" + vertical[letterindex + count] + i);
        }
      }

      count++;
    }

    count = 0;

    for (let i = number; i >= 0; i--) {
      if (letter + number !== vertical[letterindex + count] + i) {
        if (isOccu(vertical[letterindex + count], i) != null) {

          let tempCord = isOccu(vertical[letterindex + count], i);
          if(tempCord.slice(-1) === _player.slice(-1)){
            break;
          }
          else{
            c.push("r_" + vertical[letterindex + count] + i);
            break;
          }

         
        } else {
          c.push("g_" + vertical[letterindex + count] + i);
        }
      }

      count--;
    }

    count = 0;

    for (let i = number; i >= 0; i--) {
      if (letter + number !== vertical[letterindex + count] + i) {
        if (isOccu(vertical[letterindex + count], i) !== null) {
          let tempCord = isOccu(vertical[letterindex + count], i);

          if(tempCord.slice(-1) === _player.slice(-1)){
            break;
          }
          else{

            c.push("r_" + vertical[letterindex + count] + i);
            break;
          }
         
        } else {
          c.push("g_" + vertical[letterindex + count] + i);
        }
      }

      count++;
    }

    count = 0;

    for (let i = number; i <= horisontal.length; i++) {
      if (letter + number !== vertical[letterindex + count] + i) {
        if (isOccu(vertical[letterindex + count], i) !== null) {

          let tempCord = isOccu(vertical[letterindex + count], i);

          if(tempCord.slice(-1) === _player.slice(-1)){

            break;
          }
          else{
            c.push("r_" + vertical[letterindex + count] + i);
            break;    
          }
        
        } else {
          c.push("g_" + vertical[letterindex + count] + i);
        }
      }

      count--;
    }

    return c;
  }

  //COLORIZE THE TILES

  function setColoredTiles(_piece, _node, _player) {
    var c = [];

    if (_piece === "q") {
      colored = diagLines(_node, _player).concat(straightLines(_node, _player));
      reRender(colored);
    }
    if (_piece === "t") {
      colored = straightLines(_node, _player);
      reRender(colored);
    }
    if (_piece === "l") {
      colored = diagLines(_node, _player);
      reRender(colored);
    }
    if (_piece === "p") {
      colored = oneTwoSteps(_node, _player);
      reRender(colored);
    }
    if (_piece === "k") {
      colored = OneStep(_node, _player);
      reRender(colored);
    }

    if (_piece === "h") {
      colored = HorseStep(_node, _player);
      reRender(colored);
    }
  }

  // EVENT FUNCTION, FIRES OF WHEN A TILES IS CLICKED

  function onsendNodePlacement(_node, _piece) {
   
if(props.currentplayer.current == props.playernumber){
 
    
    if (_node.split("_")[1] === "yellow" && _node.split("_")[0] === _piece) {
      colored = [];

      reRender(colored);
    } else if (
      _node.split("_")[1] === "green" &&
      _node.split("_")[0] === _piece
    ) {
      if (props.currentplayer.current === "1") {
        p1Positions.current = ({ ...p1Positions.current, [current.current]: _node.split("_")[0] });
        
      
     
        colored = [];
        onBoardSend(gameBoardinit, p1Positions, p2Positions);
        reRender(colored, true);
       
      } else if (props.currentplayer.current === "2") {
        p2Positions.current = ({ ...p2Positions.current, [current.current]: _node.split("_")[0] });
        
        
       
        colored = [];
        onBoardSend(gameBoardinit, p1Positions, p2Positions);
        reRender(colored, true);
      
      }
    } else if (_node.split("_")[1] === "red") {
      let node = _node.split("_")[0];
      let letter = node.split("")[0];
      let number = node.split("")[1];

      if (props.playernumber == "1") {


        props.onPieceKnockout(isOccu(letter, number), "2");
        p2Positions.current = ({ ...p2Positions.current, [isOccu(letter, number)]: "d10" });
        p1Positions.current = ({ ...p1Positions.current, [current.current]: node });

      

        

        

        
        onBoardSend(gameBoardinit, p1Positions, p2Positions);    
     

      } else if (props.playernumber == "2") {
      
        props.onPieceKnockout(isOccu(letter, number), "1");
        p1Positions.current = ({ ...p1Positions.current, [isOccu(letter, number)]: "d10" });
        p2Positions.current = ({ ...p2Positions.current, [current.current]: node });
       
      
        
        onBoardSend(gameBoardinit, p1Positions, p2Positions);    
   
  
      }
    } else {
      

      if(_piece.slice(-1) === props.currentplayer.current){

        current.current = _piece;
  
        if (_piece.includes("pieceq")) {
      
          setColoredTiles("q", _node, current.current);
        }
        if (_piece.includes("piecet")) {
          setColoredTiles("t", _node, current.current);
        }
        if (_piece.includes("piecel")) {
          setColoredTiles("l", _node, current.current);
        }
        if (_piece.includes("piecep")) {
          setColoredTiles("p", _node, _piece.slice(-1));
        }
  
        if (_piece.includes("piecek")) {
          setColoredTiles("k", _node, current.current);
        }
        if (_piece.includes("pieceh")) {
          setColoredTiles("h", _node, current.current);
        }

      }
      
    }

  }
  else{
    console.log("wrong client");
  }



  }

  // DOM-RENDER

  return (
    <div className="chessboard">
      {gameBoard.map((node) => (
        <ChessNode
          sendNodePlacement={onsendNodePlacement}
          node={node}
          color={node.split("_")[1]}
          piece={isPiece(node)}
          key={node}
          
        ></ChessNode>
      ))}
    </div>
  );
}
