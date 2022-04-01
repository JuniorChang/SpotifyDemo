import React from 'react';
import './App.css';

import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import  Spotify  from '../../util/Spotify';
require('dotenv').config();



class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = { 
      searchResults: [],
      playlistName: 'My Super Playlist',
      playlistTracks: []
     };

     this.addTrack = this.addTrack.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
     this.updatePlayListName = this.updatePlayListName.bind(this);
     this.savePlayList = this.savePlayList.bind(this);
     this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks});
  }

  updatePlayListName(name) {
    this.setState({playlistName: name})
  }

  savePlayList() {
    // alert(`Playlist ${this.state.playlistName} is saved!`);
    const trackUris =  this.state.playlistTracks.map( track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() =>{ 
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    })
  }

  render() {
    return (
      
      <div>
        
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch = {this.search} />
          <div className="App-playlist">
          <SearchResults 
            searchResults={this.state.searchResults} 
            onAdd={this.addTrack} 
            />
            
          <Playlist 
            playlistTracks= {this.state.playlistTracks} 
            playlistName={this.state.playlistName}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlayListName}
            onSave = {this.savePlayList}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
