import React from 'react';
import "./LastRow.css";

export default function LastRow(props) {
    return (
        <div className="lastrow">
            {props.children}
        </div>
    )
}
