import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTrack } from '../../actions/profile';
import SelectedTracks from '../search/SelectedTracks';

const AddTrack = ({ track, addTrack, setSearchResults }) => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    artist: '',
    img: '',
  });

  useEffect(() => {
    setFormData({
      id: track.id,
      title: track.title,
      artist: track.artist,
      img: track.albumUrl,
    });
  }, [track]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        addTrack(formData);
        setSearchResults([]);
      }}
    >
      <SelectedTracks track={track} />
    </button>
  );
};

AddTrack.propTypes = {
  addTrack: PropTypes.func.isRequired,
};

export default connect(null, { addTrack })(AddTrack);
