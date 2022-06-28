import React, { Component } from 'react'
import TrackList from '../TrackList/TrackList'
import './PlayList.css'


export default class PlayList extends Component {
  constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }

  render() {
    return (
     <div className="Playlist">
    <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
      {/* <!-- Add a TrackList component --> */}
        <TrackList tracks={this.props.playlistTracks}
      onRemove={this.props.onRemove}
    isRemoval={true}/>
  <button class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
</div>
    )
  }
}
