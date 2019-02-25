import NewArticleContainer from './NewArticleContainer';
import NewArticleView from './NewArticleView';
import extend from './extend';

const NewArticleViewHOC = extend(NewArticleView);
const NewArticleContainerHOC = extend(NewArticleContainer);

export default NewArticleContainerHOC;

export {
  NewArticleView,
  NewArticleContainer,
  NewArticleViewHOC,
  NewArticleContainerHOC,
};
