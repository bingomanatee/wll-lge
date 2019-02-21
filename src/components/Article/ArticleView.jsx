import React from 'react';
import pt from 'prop-types';
import marked from 'marked';
import {ArticleFrame, PageHead, Text, ButtonList, FuzzyBox, EditButton} from '../style';
import ArticleEdit from '../ArticleEdit';

const ArticleView = ({loaded, title, content, isAdmin, isEditing, toggleEdit, path}) => {
  if (!loaded) {
    return '';
  }
  console.log('rendering content: ', content.substr(0, 20), '...', content.substr(-100));
  return (
    <div>
      <PageHead>{title}</PageHead>
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
