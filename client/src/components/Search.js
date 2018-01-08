import React from 'react';
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';



class Search extends React.Component {
  state = {
    query: '',
    results: [],
    selectedTrack: null
  }
  updateQuery = (evt) => {
    var value = evt;
    if (evt.target) {
      value = evt.target.value;
    }
    this.setState({
      query: value
    });
    this.props.onSubmit(value);
  }
  render() {
    return (
      <div>
        <div className='field'>
          <div className='control'>
            <input onChange={this.updateQuery} name='query' className='input' type='text' placeholder='Enter a track' />
          </div>
        </div>
        <ul>
          {this.props.results.map((track) => (
          <Link to={`/${track.id}`} >
            <div className='card'>
              <div className='card-content'>
                <div className='media'>
                  <div className='media-content'>
                    <p className='title is-6'>{track.name}</p>
                    <p className='subtitle is-6'>{track.artist}</p>
                  </div>
                </div>
              </div>
            </div>
        </Link>
        ))}
      </ul>
    </div>
    )
  }
}

export default Search;
