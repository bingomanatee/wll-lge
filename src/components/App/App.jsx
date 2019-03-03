import React, {Component} from 'react';
import _ from 'lodash';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import sc from 'styled-components';
import Navbar from '../Navbar';
import Homepage from '../Homepage';
import Article from '../Article';
import Category from '../Category';
import NewArticle from '../NewArticle';
import EditCategory from '../EditCatergory';

import userStore from '../../models/user';

const SiteFrame = sc.div`
  width: 100vw;
  height: 100vh
  background-color: transparent;
  justify-content: start;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`;

const Content = sc.div`
flex: 1;
overflow-y: auto;
`;

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <SiteFrame id="site-frame" data-id="site-frame">
          <Navbar userStore={userStore}/>
          <Content>
            <Switch>
              <Route path="/login" exact component={Homepage}/>
              <Route path="/logout" exact component={Homepage}/>
              <Route path="/" exact component={Homepage}/>
              <Route path="/article/:path*" component={Article}/>
              <Route path="/category/:directory*" component={Category}/>
              <Route path="/new-article" component={NewArticle}/>
              <Route path="/edit-article/:path*" component={NewArticle}/>
              <Route path="/edit-category/:directory*" component={EditCategory}/>
              <Redirect from="/*" to="/"/>
            </Switch>
          </Content>
        </SiteFrame>
      </BrowserRouter>
    );
  }
}
