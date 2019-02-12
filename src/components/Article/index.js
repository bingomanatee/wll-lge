import ArticleContainer from './ArticleContainer';
import ArticleView from './ArticleView';
import extend from './extend';

const ArticleViewHOC = extend(ArticleView);
const ArticleContainerHOC = extend(ArticleContainer);

export default ArticleContainerHOC

export {
  ArticleView,
  ArticleContainer,
  ArticleViewHOC,
  ArticleContainerHOC,
};
