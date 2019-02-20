import auth0 from 'auth0-js';
import {Store} from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;

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
    logIn(){
      webAuth.authorize();
    },
    logOut(){
      webAuth.logout({
        returnTo: window.location.origin + '/logout'
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
            store.actions.setUser(user);
            done({...store.state, user, accessToken});
          });
        });
      }
    }
  }
})
  .addProp('accessToken', false)
  .addProp('user', false);



if (window.location.hash.includes('access_token')) {
  webAuth.parseHash({hash: window.location.hash}, function (err, authResult) {
    if (err) {
      return console.log(err);
    }
    console.log('getting user from ', authResult);
    localStorage.setItem('auth0.accessToken', authResult.accessToken);
    userStore.actions.getUserInfo(authResult.accessToken);
  });
} else if (userStore.state.accessToken) {
  userStore.getUserInfo();
}

export default userStore;

