import React from 'react';
import "./ChessRow.css"

export default function ChessRow(props) {
    return (
        <div className="chessrow">
            {props.children}
        </div>
    )
}
