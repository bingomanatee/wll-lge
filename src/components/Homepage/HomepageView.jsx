import React from 'react';
import pt from 'prop-types';
import {ArticleWrapper, ArticleList, ArticleItem} from '../style';

const HomepageView = (state) => {
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
