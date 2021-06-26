import React from 'react';
import "./PlayerBar.css";

export default function PlayerBar(props) {

var content = "";
var style = "playerbar";

if(props.playernames !== undefined){

    if(props.playernumber === "2"){

       
        style = "playerbar " + "player2";
        if(props.playernames[1] !== ""){
           content = props.playernames[1];
        }      
    }
    if(props.playernumber === "1"){

        style = "playerbar " + "player1";
        if(props.playernames[0] !== ""){
            content = props.playernames[0];
        }
    }
}
else{
    
}


return (
    <div className={style}>
        {content}
    </div>
)

  
}
