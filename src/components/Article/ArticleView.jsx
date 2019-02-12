import React from 'react';
import pt from 'prop-types';
import marked from 'marked';
import {ArticleFrame, PageHead, Text} from '../style';

const ArticleView = ({loaded, title, content}) => {
  if (!loaded) {
    return '';
  }
  return (
    <div>
      <PageHead>{title}</PageHead>
    <ArticleFrame>
      <Text dangerouslySetInnerHTML={{__html: marked(content)}}/>
    </ArticleFrame>
    </div>
  );
};

ArticleView.propTypes = {
  title: pt.string,
  content: pt.string,
  loaded: pt.bool
};

ArticleView.defaultProps = {
  title: '',
  content: '',
  loaded: false
};

export default ArticleView;
