import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from './types';

// for some reason universal axios header in utils is not working and Django is not recognizing it!!!! >:(
// const token = localStorage.getItem('token');
// const getConfig = {
//   headers: {
//     Authorization: `Token ${token}`,
//   },
// };

// Get Current User's Profile

export const getCurrentProfile = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // This needs to be included in GET requests or django will reject it!!!
  }

  try {
    // axios get response from Django backend /profile/me
    const res = await axios.get('/profile/me'); // this endoint is HUGE problem

    console.log(res.data.profile);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE }); // we need clear profile here so that the previous user's profile doesnt get remained in the browser

  try {
    const res = await axios.get('/profile/members');

    dispatch({
      type: GET_PROFILES,
      payload: res.data.profiles, // .profiles to get the specific array of profiles
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Profile By ID

export const getProfileById = (userId) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token); // This needs to be included in GET requests or django will reject it!!!
  }

  try {
    const res = await axios.get(`/profile/member/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data.profile,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or Update a Profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    // making a request to the backend always use aync/await because it returns a promise
    // when sending data, you need to make a config object constant to send to the backend just like in login auth action

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('/profile/', formData, config);

      // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
      //the same type as getCurrentProfile
      dispatch({
        type: GET_PROFILE,
        payload: res.data.profile,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );

      // if its not an edit (aka first time created) go back to dashboard
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Delete User Account

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone.')) {
    try {
      await axios.delete('/profile/');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Add Genre, Artists, Tracks below

//Add Genre

export const addGenre = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/genre', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Favorite Genre Added', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Artist

export const addArtist = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/artist', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Favorite Artist Added', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Favorite Track

export const addTrack = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // make a PUT request instead of request because in the backend, we made experience node a PUT request
    const res = await axios.put('/profile/track', formData, config);

    // Since the response to the post action to node is a profile data, the dispatch type is just GET_PROFILE
    //the same type as getCurrentProfile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile,
    });
    console.log(res.data.profile);

    dispatch(setAlert('Favorite Track Added', 'success'));

    // if its not an edit (aka first time created) go back to dashboard
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(err.response);

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
