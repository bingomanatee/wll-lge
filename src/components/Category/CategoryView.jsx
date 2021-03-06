import React from 'react';
import _ from 'lodash';
import pt from 'prop-types';
import {
  CategoryTextFrame,
  CategoryHead,
  CategoryHeadFrame,
  ArticleList,
  ArticleListWrapper,
  ButtonList,
  EditLink,
  TextCategory,
  PageHead,
} from '../../style';
import encodePath from '../../js/encodePath';
import ArticleLinks from '../ArticleLinks';
import marked from 'marked';

const noop = a => a;

const CategoryView = ({category, isAdmin, directory, content, title, categoryArticles}) => (
  <div>
    <CategoryHeadFrame>
      <CategoryHead>{title}</CategoryHead>
      {content && <CategoryTextFrame>
        <TextCategory dangerouslySetInnerHTML={{__html: marked(content)}}/>
      </CategoryTextFrame>}
    </CategoryHeadFrame>
    <ArticleListWrapper data-type="ArticleListWrapper">
      <ArticleList>
        <ArticleLinks articles={categoryArticles.filter(a => a.published || isAdmin)}/>
      </ArticleList>
    </ArticleListWrapper>
    {isAdmin && <ButtonList>
      <EditLink to={'/edit-category/' + encodePath(directory)}>
        Edit
      </EditLink>
    </ButtonList>}
  </div>
);

CategoryView.propTypes = {
  category: pt.object,
  isAdmin: pt.bool,
  isEditing: pt.bool,
  categoryArticles: pt.array,
  content: pt.string,
};

CategoryView.defaultProps = {
  category: {},
  isAdmin: false,
  isEditing: false,
  toggleEdit: noop,
  categoryArticles: [],
  content: pt.string,
};

export default CategoryView;
