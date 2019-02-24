import React from 'react';
import pt from 'prop-types';
import {ArticleListWrapper, ArticleList, ArticleItem, ArticleText} from '../style';

const HomepageView = (state) => {
  return (
    <ArticleListWrapper>
      <ArticleList>
        {state.homepageArticles.map(a => (<React.Fragment>
          <ArticleItem
            to={'/article/' + a.path}
            key={a.path}>{a.title}</ArticleItem>
          {a.description && <ArticleText>{a.description}</ArticleText>}
        </React.Fragment>))}
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
