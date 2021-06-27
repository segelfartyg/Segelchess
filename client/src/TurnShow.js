import React from 'react';
import "./TurnShow.css";

export default function TurnShow(props) {

let content;
let style = "turnshow";


if(props.currentplayername !== ""){


    content = props.currentplayername.split("_")[0] + " 's turn";

}
else{
    content = "WAITING FOR ANOTHER PLAYER";
}

if(!props.show){
    style += " noshow";
}

    return (
        <div className={style}>
            {content}
        </div>
    )


}
