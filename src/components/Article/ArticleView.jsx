import React from 'react';
import pt from 'prop-types';
import sc from 'styled-components';
import marked from 'marked';

const BG_COLOR = 'rgba(255,255,204,0.85)';

const PageHead = sc.h1`
font-family: 'Merriweather Sans', sans-serif;
color: white;
font-weight: 300;
font-size: 2rem;
`;

const ArticleFrame = sc.article`
padding: 2rem 3rem;
overflow-y: scroll;
`;

const Text = sc.div`
padding: 2rem;
background-color: ${BG_COLOR};
-webkit-box-shadow: 0px 0px 8px 4px ${BG_COLOR};
-moz-box-shadow: 0px 0px 8px 4px ${BG_COLOR};
box-shadow: 0px 0px 8px 4px ${BG_COLOR};
font-family: 'Cormorant Garamond',Georgia,serif;
font-size: 1.5rem;

pre {
font-size: 1rem;
}
`;

const noop = a => a;

const ArticleView = ({ loaded, title, content }) => {
  if(!loaded) return '';
  return (
    <ArticleFrame>
      <PageHead>{title}</PageHead>
      <Text dangerouslySetInnerHTML={{__html: marked(content)}} />
    </ArticleFrame>
  );
};

ArticleView.propTypes = {
  articleFoo: pt.string,
  setArticleFoo: pt.func,
};

ArticleView.defaultProps = {
  articleFoo: '',
  setArticleFoo: noop,
};

export default ArticleView;
