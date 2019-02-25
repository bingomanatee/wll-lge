import React from 'react';
import pt from 'prop-types';
import {ArticleListWrapper} from '../style';
import ArticleLinks from '../ArticleLinks';
const HomepageView = ({homepageArticles}) => {
  return (
    <ArticleListWrapper>
      <ArticleLinks articles={homepageArticles} />
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
