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


    function onPressed(room){


        props.showTurnShow();
  
       props.onUserNamePress(username.current.value, room);
    }

    return (
        <div className={style}>
              <label htmlFor="nameinput">Username</label>
            <input name="nameinput" type="text" ref={username}></input>



            <div className="rooms">


            <div>
            <p>SEGEL 1</p>
       
            <button id="1"  className="roombutton" onClick={() => onPressed(1)}>JOIN</button>

           
             <p>{props.inside[0]}/2</p>
             </div>

             <div>
             <p>SEGEL 2</p>
            <button  id="2" className="roombutton" onClick={() => onPressed(2)}>JOIN</button>
             
             <p>{props.inside[1]}/2</p>
             </div>


            <div>
             <p>SEGEL 3</p>
            <button  id="3" className="roombutton" onClick={() => onPressed(3)}>JOIN</button>
        
             <p>{props.inside[2]}/2</p>
             </div>
            </div>
          
            </div>
    )
}
