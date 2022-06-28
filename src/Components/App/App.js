import './App.css';
import React, { Component } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResult/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchResults: [],
        playlistName: 'My Playlist',
        playlistTracks: [],
        term: ''
    
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track){
    let tracks = this.state.playlistTracks
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return
    }
    tracks.push(track)
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id)

    this.setState({ playlistTracks: tracks})
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name})
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    console.log(term)
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  // spotify:track:6rqhFgbbKwnb9MLmUQDhG6

  render() {
    return (
      <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
        {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={this.search}/>
              <div className="App-playlist">
            {/* <!-- Add a SearchResults component -->
          <!-- Add a Playlist component --> */}
        <SearchResults searchResults={this.state.searchResults}
         onAdd={this.addTrack}/>
        <PlayList onNameChange={this.updatePlaylistName} onRemove={this.removeTrack}
           playlistName={this.state.playlistName}
           playlistTracks={this.state.playlistTracks}
           onSave={this.savePlaylist}
        />
    </div>
  </div>
</div>
    )
  }
  }