import ArticleEditContainer from './ArticleEditContainer';
import ArticleEditView from './ArticleEditView';
import extend from './extend';

const ArticleEditViewHOC = extend(ArticleEditView);
const ArticleEditContainerHOC = extend(ArticleEditContainer);

export default ArticleEditContainerHOC

export {
  ArticleEditView,
  ArticleEditContainer,
  ArticleEditViewHOC,
  ArticleEditContainerHOC,
};
