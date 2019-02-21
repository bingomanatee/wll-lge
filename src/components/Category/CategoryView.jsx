import React from 'react';
import _ from 'lodash';
import pt from 'prop-types';
import {
  ArticleFrame,
  ArticleItem,
  ArticleList,
  ArticleListWrapper,
  ButtonList,
  EditButton,
  FuzzyBox,
  PageHead,
  Text
} from '../style';
import CategoryEdit from '../CategoryEdit';

const noop = a => a;

const CategoryView = ({ category, isAdmin, toggleEdit, isEditing, categoryArticles }) => (
  <div>
    <PageHead>{_.get(category, 'title')}</PageHead>
    <ArticleListWrapper>
      <ArticleList>
        {categoryArticles.map(a => (<ArticleItem
          to={'/article/' + a.path}
          key={a.path}>{a.title}</ArticleItem>))}
      </ArticleList>
    </ArticleListWrapper>
    {isEditing && <CategoryEdit category={category} />}
    {isAdmin && <ButtonList>
      <EditButton data-sc-type='ButtonList' onClick={toggleEdit}>
        {isEditing ? 'Cancel' : 'Edit'}
      </EditButton>
    </ButtonList>}
  </div>
);

CategoryView.propTypes = {
  category: pt.object,
  isAdmin: pt.bool,
  isEditing: pt.bool,
  categoryArticles: pt.array,
  toggleEdit: pt.func
};

CategoryView.defaultProps = {
  category: {},
  isAdmin: false,
  isEditing: false,
  toggleEdit: noop,
  categoryArticles: []
};

export default CategoryView;
