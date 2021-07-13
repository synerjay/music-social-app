import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackResults from './TrackResults';
import AddTrack from '../profile-forms/AddTrack';

const SearchTracks = () => {
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // This compoennt is for testing the search Artists Tracks function
  const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env;

  // Make new instance of Spotify API
  const spotifyApi = new SpotifyWebApi();

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    spotifyApi.setAccessToken(token); // just to make sure because sometimes searchTracks doesnt work
    spotifyApi.searchTracks(search, { limit: 5 }).then(
      function (data) {
        setSearchResults(
          data.body.tracks.items.map((track) => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image;
                return smallest;
              },
              track.album.images[0]
            );

            return {
              artist: track.artists[0].name,
              title: track.name,
              uri: track.uri,
              albumUrl: smallestAlbumImage.url,
              album: track.album.name,
            };
          })
        );
      },
      function (err) {
        console.error(err);
      }
    );

    // spotifyApi.searchTracks('track:Alright artist:Kendrick Lamar').then(
    //   function (data) {
    //     console.log(
    //       'Search tracks by "Alright" in the track name and "Kendrick Lamar" in the artist name',
    //       data.body
    //     );
    //   },
    //   function (err) {
    //     console.log('Something went wrong!', err);
    //   }
    // );
    // spotifyApi.searchArtists('doja cat').then(
    //   function (data) {
    //     console.log('Search artist', data.body);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );
  }, [search, token]);

  // useEffect for POST request to Spotify AUTH token, which expires every 3600
  // Needs to be in its reducer
  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + btoa(REACT_APP_CLIENT_ID + ':' + REACT_APP_CLIENT_SECRET),
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    }).then((tokenResponse) => {
      // Once we get a Spotify token we can get the Genres list using the token
      console.log('Successfully Recieve Spotify Token');
      console.log(tokenResponse.data);
      spotifyApi.setAccessToken(tokenResponse.data.access_token); // Getting accessToken to spotifyApi is very important!!!
      setToken(tokenResponse.data.access_token);
    });
  }, []);

  return (
    <div className='flex justify-center items-center'>
      <form
        className='form'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      >
        <div className='flex flex-col '>
          <div className='form-group'>
            <input
              type='text'
              className='w-full focus:shadow focus:outline-none'
              placeholder='Add your favorite Tracks'
            />
          </div>
          <div className='overflow-scroll flex flex-col'>
            {searchResults.map((track) => (
              <AddTrack track={track} key={track.uri} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchTracks;