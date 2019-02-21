/** @global process */

import auth0 from 'auth0-js';
import {Store} from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import axios from 'axios';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const API_URL = process.env.API_URL;
console.log('API URL:', API_URL);

var webAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: window.location.origin + '/login',
  responseType: 'token id_token'
});

let user = null;
if (localStorage.getItem('auth0.user')){
  try {
    user = JSON.parse(localStorage.getItem('auth0.user'));
  } catch (err) {
    console.log('error parsing user: ', user);
  }
}

let accessToken = localStorage.getItem('auth0.accessToken') || false;

let state = {
  accessToken,
  user
};

let userStore = new Store({
  state,
  actions: {
    clearUser(store) {
      localStorage.setItem('auth0.accessToken', null);
      localStorage.setItem('auth0.user', null);
      store.actions.setUser(false);
      store.actions.setAccessToken(false);
      store.actions.setSub('');
    },
    logIn(){
      webAuth.authorize();
    },
    logOut(store){
      store.actions.clearUser();
      webAuth.logout({
        returnTo: window.location.origin + '/logout'
      });
    },
    getAuth(store, accessToken, sub) {
      return axios.post(`${API_URL}/auth`, {sub, access_token: accessToken},
        {
          headers: {sub, access_token: accessToken}
        })
        .then((result) => {
          const isAdmin = result.data.isAdmin;
          console.log('result of auth call: ', isAdmin, result.data);
          store.actions.setIsAdmin(isAdmin);
        })
        .catch(() => {
          store.actions.setIsAdmin(false);
        });
    },
    getUserInfo(store, accessToken){
      if (!accessToken) {
        accessToken = store.state.accessToken;
      }

      if (accessToken) {
        return new Promise((done, fail) => {
          webAuth.client.userInfo(accessToken, function (err, user) {
            if (err) {
              console.log('error getting user:', err);
              return fail(err);
            }

            localStorage.setItem('auth0.user', JSON.stringify(user));
            const sub = _.get(user, 'sub', false );

            if (sub){
              store.actions.getAuth(accessToken, sub);
            }

            store.actions.setUser(user);
            done({...store.state, user, accessToken, sub});
          });
        });
      }
    }
  }
})
  .addProp('accessToken', {
    start: accessToken,
    type: 'string'
  })
  .addProp('sub', {
    start: '',
    type: 'string'
  })
  .addProp('isAdmin', {
    start: false,
    type: 'boolean'
  })
  .addProp('user', {
    start: false
  });

if (window.location.hash.includes('access_token')) {
  webAuth.parseHash({hash: window.location.hash}, function (err, authResult) {
    window.location.hash = '';
    if (err) {
      userStore.actions.clearUser();
      return console.log('error parsing hash:', err);
    }
    console.log('getting user from ', authResult);
    localStorage.setItem('auth0.accessToken', authResult.accessToken);
    userStore.actions.getUserInfo(authResult.accessToken);
  });
} else if (userStore.state.accessToken) {
  userStore.actions.getUserInfo();
}

export default userStore;

