import express from 'express';
import morgan from 'morgan';

import SpotifyClient from './SpotifyClient';

const app = express();

app.set('port', (process.env.API_PORT || 3001));

if (process.env.NODE_ENV !== 'TEST') {
  app.use(morgan('combined'));
}

// A fake API token our server validates
export const API_TOKEN = 'D6W69PRgCoDKgHZGJmRUNA';


const extractToken = (req) => (
  req.query.token
);

const authenticatedRoute = ((req, res, next) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid token provided',
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      error: 'No token provided. Supply token as query param `token`',
    });
  }
});

app.get('/api/check_token', (req, res) => {
  const token = extractToken(req);

  if (token) {
    if (token === API_TOKEN) {
      return res.json({ valid: true });
    } else {
      return res.json({ valid: false });
    }
  } else {
    return res.status(400).json({
      valid: false,
      error: 'No token found in `Authorization` header',
    });
  }
});

app.get('/api/albums', authenticatedRoute, (req, res) => {
  //const songKeywords = req.query.keywords.split('+');
  const albumIds = req.query.ids.split(',');
  SpotifyClient.getAlbums(albumIds).then((songs) => (
    res.json(songs)
  )).catch((error) => (
    res.status(500).json({
      success: false,
      message: 'error with spotify api',
      error: error,
    })
  ));
});

app.get('/api/tracks', authenticatedRoute, (req, res) => {
  const trackId = req.query.id;
  SpotifyClient.getTrack(trackId).then((track) => (
    res.json(track)
  )).catch((error) => (
    res.status(500).json({
      success: false,
      message: 'error with spotify',
      error: error,
    })
  ));
});

app.get('/api/tracks/search', authenticatedRoute, (req, res) => {
  const keywords = req.query.keywords.split('+');
  SpotifyClient.getTracks(keywords).then((tracks) => (
    res.json(tracks)
  )).catch((error) => (
    res.status(500).json({
      success: false,
      message: 'There was an error when interfacing with Spotify',
      error: error,
    })
  ));
});

// Make things more noticeable in the UI by introducing a fake delay
// to logins
const FAKE_DELAY = 500; // ms
app.post('/api/login', (req, res) => {
  setTimeout(() => (
    res.json({
      success: true,
      token: API_TOKEN,
    })
  ), FAKE_DELAY);
});

export default app;
