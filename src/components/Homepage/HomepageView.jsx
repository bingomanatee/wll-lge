import React from 'react';
import pt from 'prop-types';

import sc from 'styled-components';
import {Link} from 'react-router-dom';

const ArticleWrapper = sc.div`
width: 100%;
@media(min-width: 800px) {
overflow-y: scroll
}`;

const ArticleList = sc.div`
@media(min-width: 800px) {
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
}
`;

const ArticleItem = sc(Link)`
display: block;
white-space: nowrap;
text-decoration: none;
color: white;
text-transform: uppercase;font-family: 'Merriweather Sans', sans-serif;
font-weight: 400;
color: white !important;
padding: 0.5rem;
@media(min-width: 800px) {
margin: 0.75rem 1rem;
}
border:1px solid rgba(200,200,200,0.25);
background: rgba(0,0,0,0.8);
:hover {
text-decoration: underline;
}
`;

const HomepageView = (state) => {
  console.log('state:', state);
  return (
    <ArticleWrapper>
      <ArticleList>
        {state.homepageArticles.map(a => (<ArticleItem
          to={'/article/' + a.path}
          key={a.path}>{a.title}</ArticleItem>))}
      </ArticleList>
    </ArticleWrapper>
  );
};

HomepageView.propTypes = {
  homepageArticles: pt.array,
};

HomepageView.defaultProps = {
  homepageArticles: []
};

export default HomepageView;
