import ArticleLinksContainer from './ArticleLinksContainer';
import ArticleLinksView from './ArticleLinksView';
import extend from './extend';

const ArticleLinksViewHOC = extend(ArticleLinksView);
const ArticleLinksContainerHOC = extend(ArticleLinksContainer);

export default ArticleLinksContainerHOC

export {
  ArticleLinksView,
  ArticleLinksContainer,
  ArticleLinksViewHOC,
  ArticleLinksContainerHOC,
};
