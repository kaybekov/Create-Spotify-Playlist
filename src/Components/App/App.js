import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';
import PlaylistList from '../PlaylistList/PlaylistList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getUserPlaylists();
  }, []);

  const getUserPlaylists = () => {
    Spotify.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists);
    });
  };

  const addTrack = (track) => {
    let tracks = playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    setPlaylistTracks((prevTracks) => {
      return [...prevTracks];
    });
  };
  const removeTrack = (track) => {
    let tracks = playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    if (trackUris && trackUris.length) {
      Spotify.savePlaylist(playlistName, trackUris).then(() => {
        getUserPlaylists();
        setPlaylistName('New Game');
        setPlaylistTracks([]);
      });
    } else {
      alert('Your playlist is empty! Please add tracks.');
    }
  };

  const search = (term) => {
    Spotify.search(term).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className='App'>
        <SearchBar onSearch={search} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />

          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onAdd={addTrack}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
        <PlaylistList playlists={playlists} />
      </div>
    </div>
  );
}

export default App;
