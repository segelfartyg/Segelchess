import React from 'react';
import "./GameArea.css";

export default function GameArea(props) {
    return (
        <div className="gamearea">
            {props.children}
        </div>
    )
}
