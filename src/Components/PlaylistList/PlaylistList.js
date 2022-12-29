import React from "react";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import "./PlaylistList.css";

const PlaylistList = (props) => {
  
    return (
      <div className="PlaylistList">
        <h2>Your Playlists</h2>
        <>
        {props.playlists && props.playlists.map((playlist) => {
          return (
            <PlaylistItem
              name={playlist.playlistName}
              key={playlist.playlistId}
            />
          );
        })}
        </>
      </div>
    );
  }


export default PlaylistList