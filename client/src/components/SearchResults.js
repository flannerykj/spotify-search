import React from 'react';
import {
  Link,
} from 'react-router-dom';
import {Card, CardTitle} from 'material-ui/Card';


class SearchResults extends React.Component {

  render() {
    return (
      <div>
       <ul>
          {this.props.tracks.map((track) => (
          <Link to={`/${track.id}`} >
            <Card>
              <CardTitle title={track.name} subtitle={track.artist} />
            </Card>
          </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default SearchResults;
