import React from 'react';
import pt from 'prop-types';
import marked from 'marked';
import {ArticleFrame, PageHead, Text, ButtonList, FuzzyBox, EditLink} from '../style';
import {Link} from 'react-router-dom' ;
import encodePath from '../../js/encodePath';

const headline = (category) => {
  if (!category) return '';
  const url = '/category/' + encodePath(category.directory);
  return <Link to={url}>
    {category.title}:&nbsp;
  </Link>;
};

const ArticleView = ({loaded, category, title, content, isAdmin, path}) => {
  if (!loaded) {
    return '';
  }
  return (
    <div>
      <PageHead>{headline(category)}{title}</PageHead>
      <ArticleFrame>
        <FuzzyBox>
          <Text dangerouslySetInnerHTML={{__html: content ? marked(content) : ''}}/>
          {isAdmin && <ButtonList>
            <EditLink to={'/edit-article/' + encodePath(path)}>
              Edit
            </EditLink>
          </ButtonList>}
        </FuzzyBox>
      </ArticleFrame>
    </div>
  );
};

ArticleView.propTypes = {
  title: pt.string,
  content: pt.string,
  loaded: pt.bool,
  category: pt.object,
  toggleEdit: pt.func,
  isAdmin: pt.bool,
  path: pt.string
};

ArticleView.defaultProps = {
  title: '',
  content: '',
  path: '',
  isAdmin: false,
  loaded: false
};

export default ArticleView;
