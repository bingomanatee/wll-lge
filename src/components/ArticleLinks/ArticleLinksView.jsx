import React from 'react';
import pt from 'prop-types';
import {ArticleItem, ArticleList, ArticleText} from '../../style';
import encodePath from '../../js/encodePath';

const ArticleLinksView = ({articles}) => (
  <ArticleList>
    {articles.reduce((m, a) => m.concat([
      <ArticleItem key={a.path}
        to={'/article/' + encodePath( a.path)}
      >
        {a.title}
        <ArticleText data-role="text">{a.description || ''}
        </ArticleText>
      </ArticleItem>
    ]), [])}
  </ArticleList>
);

ArticleLinksView.propTypes = {
  articles: pt.array,
};

ArticleLinksView.defaultProps = {
  articles: []
};

export default ArticleLinksView;
