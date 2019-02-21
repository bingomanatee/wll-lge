import CategoryEditContainer from './CategoryEditContainer';
import CategoryEditView from './CategoryEditView';
import extend from './extend';

const CategoryEditViewHOC = extend(CategoryEditView);
const CategoryEditContainerHOC = extend(CategoryEditContainer);

export default CategoryEditContainerHOC

export {
  CategoryEditView,
  CategoryEditContainer,
  CategoryEditViewHOC,
  CategoryEditContainerHOC,
};
