import React from 'react';
import pt from 'prop-types';
import marked from 'marked';
import {ArticleFrame, PageHead, Text, ButtonList, FuzzyBox, EditButton} from '../style';
import ArticleEdit from '../ArticleEdit';
import {Link} from 'react-router-dom' ;
import encodePath from '../../js/encodePath';

const headline = (category) => {
  if (!category) return '';
  const url = '/category/' + encodePath(category.directory);
  console.log('url:', url);
  return <Link to={url}>
    {category.title}:&nbsp;
  </Link>;
};

const ArticleView = ({loaded, category, title, content, isAdmin, isEditing, toggleEdit, path}) => {
  if (!loaded) {
    return '';
  }
  return (
    <div>
      <PageHead>{headline(category)}{title}</PageHead>
      <ArticleFrame>
        <FuzzyBox>
          {!isEditing && <Text dangerouslySetInnerHTML={{__html: marked(content)}}/>}
          {isEditing && <ArticleEdit path={path} onSave={toggleEdit}/>}
          {isAdmin && <ButtonList>
            <EditButton data-sc-type='ButtonList' onClick={toggleEdit}>
              {isEditing ? 'Cancel' : 'Edit'}
            </EditButton>
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
  toggleEdit: pt.func,
};

ArticleView.defaultProps = {
  title: '',
  content: '',
  loaded: false
};

export default ArticleView;
