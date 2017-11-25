import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import { signup, login, logout } from './actions/session';
import Root from './components/root';
import { fetchPhotos,
         fetchPhoto,
         postPhoto,
         fetchUserPhotos } from './util/photo_api_util';
import { requestPhotos,
         requestPhoto,
         createPhoto,
         deletePhoto,
         requestUserPhotos } from './actions/photo';

document.addEventListener('DOMContentLoaded', () => {

  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  // TESTING STUFF
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  // window.fetchPhotos = fetchPhotos;
  // window.fetchPhoto = fetchPhoto;
  // window.postPhoto = postPhoto;
  // window.fetchUserPhotos = fetchUserPhotos;
  window.requestPhotos = requestPhotos;

  ////////////////
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
