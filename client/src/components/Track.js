import React from 'react';
import { client } from '../Client.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      track: this.setTrack(this.props.trackId),
      isLoading: true
    }
  }
  setTrack = (trackId) => {
    client.getTrack(trackId).then((track) => this.setState({
      track: track,
      isLoading: false
    }))
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      isLoading: true
    });
    this.setTrack(newProps.trackId);
  }
  render() {
    const track = this.state.track
    console.log(track);
    return(
      <div>
        {this.state.track?(
        <div className='card'>
          <div className='card-image'>
            <figure className='image is-4by3'>
              <img src={track.coverArt} alt="" />
            </figure>
          </div>
          <div className='card-content'>
            <div className='media'>
              <div className='media-content'>
                <p className='title is-4'>{track.name}</p>
                <p className='subtitle is-5'>{track.artist}</p>
                <p className='subtitle is-7'>{track.album.year}</p>
              </div>
            </div>
            <div className='content'>
              <a className='button' href={track.previewUrl} target='_blank'>Preview Track</a>
              <a className='button is-success' href={track.spotifyUrl} target='_blank'>Listen on Spotify</a>
            </div>
          </div>
        </div>
        ):
        (<span> Loading </span>)
        }
    </div>
    );
  }
}

export default Track;
