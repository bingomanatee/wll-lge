import React from 'react';
import _ from 'lodash';
import pt from 'prop-types';
import {ArticleFrame, ArticleItem, ArticleList, ArticleWrapper, PageHead, Text} from '../style';
const noop = a => a;

const CategoryView = ({ category, categoryArticles }) => (
  <div>
    <PageHead>{_.get(category, 'title')}</PageHead>
    <ArticleWrapper>
      <ArticleList>
        {categoryArticles.map(a => (<ArticleItem
          to={'/article/' + a.path}
          key={a.path}>{a.title}</ArticleItem>))}
      </ArticleList>
    </ArticleWrapper>
  </div>
);

CategoryView.propTypes = {
  category: pt.object,
};

CategoryView.defaultProps = {
  category: {}
};

export default CategoryView;
