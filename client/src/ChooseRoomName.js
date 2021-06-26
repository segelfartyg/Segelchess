import React, {useRef} from 'react';
import "./ChooseRoomName.css";

export default function ChooseRoomName(props) {

    const username = useRef();
    const room = useRef();

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

       
       props.onUserNamePress(username.current.value, room.current.id);
    }

    return (
        <div className={style}>
              <label htmlFor="nameinput">Username</label>
            <input name="nameinput" type="text" ref={username}></input>



            <div className="rooms">


            <div>
            <p>SEGEL 1</p>
       
            <button id="1" ref={room} className="roombutton" onClick={onPressed}>JOIN</button>

             {inside}
             <p>0/2</p>
             </div>

             <div>
             <p>SEGEL 2</p>
            <button  id="2" ref={room} className="roombutton" onClick={onPressed}>JOIN</button>
             {inside}
             <p>0/2</p>
             </div>


            <div>
             <p>SEGEL 3</p>
            <button  id="3" ref={room} className="roombutton" onClick={onPressed}>JOIN</button>
             {inside}
             <p>0/2</p>
             </div>
            </div>
          
            </div>
    )
}
