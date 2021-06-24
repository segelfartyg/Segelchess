import React from 'react';
import "./ChessNode.css";
import KingSvg from './kingwhite.svg';
import KingBSvg from './kingblack.svg';
import QueenSvg from './kingwhiteboldqueen.svg';
import QueenBSvg from './blackboldqueen.svg';
import HorseSvg from './whiteboldhorse.svg';
import HorseBSvg from './blackboldhorse.svg';
import TowerSvg from './whiteboldtower.svg';
import TowerBSvg from './blackboldtower.svg';
import LSvg from './whiteboldl.svg';
import LBSvg from './blackboldl.svg';
import peasantB from './blackboldpeasant.svg';
import peasant from './whiteboldpeasant.svg';



export default function ChessNode(props) {

    let result = "";

    let background = "";
   
 
    if(props.piece.includes("piece")){

        if (props.piece.includes("piecep")){
            if(props.piece.slice(-1) === "1"){
                result = <img src={peasant} className="ordinary" alt=""/>;
            }
            
            if(props.piece.slice(-1) === "2") {
               
                result = <img src={peasantB} className="ordinary" alt=""/>;
            }
            
        }
        else if (props.piece.includes("piecet")){

            if(props.piece.slice(-1) === "1"){
                result = <img src={TowerSvg} className="ordinary" alt=""/>;
            }
            else if((props.piece.slice(-1) === "2")){
                result = <img src={TowerBSvg} className="ordinary" alt=""/>;
            }
        
        }
        else if (props.piece.includes("pieceh")){
           

            if(props.piece.slice(-1) === "1"){
               result = <img src={HorseSvg} className="ordinary" alt=""/>;
            }
            else if((props.piece.slice(-1) === "2")){
                result = <img src={HorseBSvg} className="ordinary" alt=""/>;
            }
        }
        else if (props.piece.includes("piecel")){
           


            if(props.piece.slice(-1) === "1"){
                result =  <img src={LSvg} className="ordinary" alt=""/>;
             }
             else if((props.piece.slice(-1) === "2")){
                result =  <img src={LBSvg} className="ordinary" alt=""/>;
             }
        }
        else if (props.piece.includes("piecek")){
           

            if(props.piece.slice(-1) === "1"){
                result =  <img src={KingSvg} className="ordinary" alt=""/>;
             }
             else if((props.piece.slice(-1) === "2")){
                result =  <img src={KingBSvg} className="ordinary" alt=""/>;
             }
        }
        else if (props.piece.includes("pieceq")){
            if(props.piece.slice(-1) === "1"){
                result =  <img src={QueenSvg} className="ordinary" alt=""/>;
             }
             else if((props.piece.slice(-1) === "2")){
                result =  <img src={QueenBSvg} className="ordinary" alt=""/>;
             }
        }
      
    }
    else{
      //  result = props.piece.split("_")[0];
    };
   
    if(props.color === "green"){
        background = "linear-gradient(60deg, rgb(0, 212, 18) 0%, rgb(0, 190, 25)50%, rgb(0, 160, 13) 100%)"
        
    }
    else if(props.color === "red"){
        background = "linear-gradient(60deg, rgb(212, 0, 0) 0%, rgb(190, 0, 0) 50%, rgb(255, 0, 0)100%)"
        
    }
    else if(props.color === "white"){
        background = "linear-gradient(60deg, rgb(185, 185, 185) 0%, rgb(218, 218, 218) 50%, rgb(238, 238, 238) 100%)";

    }
    else if(props.color === "black"){
        background = "linear-gradient(60deg, rgb(44, 44, 44) 0%, rgb(58, 58, 58) 50%, rgb(66, 66, 66) 100%)";

    }
    else{
        background = "linear-gradient(60deg, rgb(212, 120, 0) 0%, rgb(190, 156, 0) 50%, rgb(255, 217, 0) 100%)";
    }
    function sendNodePlacement(){
      
        props.sendNodePlacement(props.node, props.piece);
    }

    return (
        <div onClick={sendNodePlacement}className="chessnode" style={{ backgroundImage: background }}>
                   {result}
            
        </div>
    )
}
