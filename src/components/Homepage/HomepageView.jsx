import React from 'react';
import pt from 'prop-types';
import {ArticleListWrapper, ArticleList, ArticleItem} from '../style';

const HomepageView = (state) => {
  return (
    <ArticleListWrapper>
      <ArticleList>
        {state.homepageArticles.map(a => (<ArticleItem
          to={'/article/' + a.path}
          key={a.path}>{a.title}</ArticleItem>))}
      </ArticleList>
    </ArticleListWrapper>
  );
};

HomepageView.propTypes = {
  homepageArticles: pt.array,
};

HomepageView.defaultProps = {
  homepageArticles: []
};

export default HomepageView;
