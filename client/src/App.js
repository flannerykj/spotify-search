import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { client } from './Client.js';
import Track from './components/Track';
import Search from './components/Search'
import SearchResults from './components/SearchResults';
import Header from './components/Header';

class App extends React.Component {
  state = {
    query: [],
    fetched: false,
    tracks: [],
    selectedTrack: null
  };

  getTracks = (query) => {
    client.getTracks(query)
      .then((tracks) => (
        this.setState({
          fetched: true,
          tracks: tracks,
        })
      ));
  }
  selectTrack = (trackId) => {
      var track = null;
        if (this.state.tracks.length > 0) {
          this.setState({
            selectedTrack: this.state.tracks.find((t) => t.id === trackId)});
        } else {
          client.getTrack(trackId).then((track) => this.setState({selectedTrack: track}))
    }
  }
  submitQuery = (searchQuery) => {
    const query = searchQuery.split(' ');
    this.getTracks(query);
  }
  render() {
    client.login();

    const trackComponent = this.props.selectedTrackId?(<Track trackId={this.props.selectedTrackId} />):(<span>Search for a song</span>);
    return(
      <div className='app'>
        <div className='container'>
          <Header />
        </div>
        <section className='section'>
          <div className='container'>
            <h1 className='title'>Search</h1>
            <h2 className='subtitle'>Find a track</h2>
            <div className='columns'>
              <div className='column search-container'>
                <Search
                  results={this.state.tracks}
                  onSubmit={this.submitQuery}
                  selectedTrackId={this.state.selectedTrack} />

              </div>
              <div className='column track-container'>
                {trackComponent}
              </div>
          </div>
        </div>
      </section>
    </div>
    );
  }
}

    export default App;
