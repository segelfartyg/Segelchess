import React from 'react';
import "./DeadPieces.css";

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




export default function DeadPieces(props) {

    
    function getPiece(_piece){

   
        if(_piece.includes("piece")){

            if (_piece.includes("piecep")){
                if(_piece.slice(-1) === "1"){
                    return <img src={peasant} className="ordinary" alt=""/>;
                }
                
                if(_piece.slice(-1) === "2") {
                    return <img src={peasantB} className="ordinary" alt=""/>;
                }
                
            }
            else if (_piece.includes("piecet")){
    
                if(_piece.slice(-1) === "1"){
                   return <img src={TowerSvg} className="ordinary" alt=""/>;
                }
                else if((_piece.slice(-1) === "2")){
                    return <img src={TowerBSvg} className="ordinary" alt=""/>;
                }
            
            }
            else if (_piece.includes("pieceh")){
               
    
                if(_piece.slice(-1) === "1"){
                   return <img src={HorseSvg} className="ordinary" alt=""/>;
                }
                else if((_piece.slice(-1) === "2")){
                    return <img src={HorseBSvg} className="ordinary" alt=""/>;
                }
            }
            else if (_piece.includes("piecel")){
               
    
    
                if(_piece.slice(-1) === "1"){
                    return  <img src={LSvg} className="ordinary" alt=""/>;
                 }
                 else if((_piece.slice(-1) === "2")){
                    return  <img src={LBSvg} className="ordinary" alt=""/>;
                 }
            }
            else if (_piece.includes("piecek")){
               
    
                if(_piece.slice(-1) === "1"){
                   return  <img src={KingSvg} className="ordinary" alt=""/>;
                 }
                 else if((_piece.slice(-1) === "2")){
                    return  <img src={KingBSvg} className="ordinary" alt=""/>;
                 }
            }
            else if (_piece.includes("pieceq")){
                if(_piece.slice(-1) === "1"){
                    return  <img src={QueenSvg} className="ordinary" alt=""/>;
                 }
                 else if((_piece.slice(-1) === "2")){
                    return  <img src={QueenBSvg} className="ordinary" alt=""/>;
                 }
            }
          
        }
      
    }
    
    
   


    return (
        <div className="deadpieces">
            <ul className="infodiv">
            {props.deadpieces.map((element) => <li key={Math.random()}>{getPiece(element)}</li>)}
            </ul>
        </div>
    )
}
