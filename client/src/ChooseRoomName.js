import React, {useRef} from 'react';
import "./ChooseRoomName.css";

export default function ChooseRoomName(props) {

    const username = useRef();

    var style = "chooseroomname"
    var inside = "";

    if(props.display === false){
        style += " nodisplay";

    }


    if(props.inside === undefined){
        inside = "";
    }
    else{
        inside = <p>{props.inside} is already in this room</p>
    }


    function onPressed(){

       props.onUserNamePress(username.current.value);
    }

    return (
        <div className={style}>
      
            <p>Room 1</p>
            <label htmlFor="nameinput">Username</label>
            <input name="nameinput" type="text" ref={username}></input>
            <button onClick={onPressed}>JOIN</button>

             {inside}
            </div>
          

    )
}
