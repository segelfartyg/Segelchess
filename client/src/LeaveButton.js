import React from 'react';
import "./LeaveButton.css";

export default function LeaveButton(props) {

    var style = "leavebutton";

    if(!props.showleavebutton){
        style += " noshow";
    }
    else{
        
    }

    function onClickEvent(){

        props.onLeaveClick();
    }


    return (
        <div className={style} onClick={onClickEvent}>
            <p>LEAVE GAME</p>
        </div>
    )
}
