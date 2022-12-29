import React from "react";
import './PlaylistItem.css';

const PlaylistItem = (props) => {

    return (
      <div className="PlaylistItem">
          <h3 name={props.name}>{props.name}</h3>
      </div>
    );
}


export default PlaylistItem