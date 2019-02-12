import CategoryContainer from './CategoryContainer';
import CategoryView from './CategoryView';
import extend from './extend';

const CategoryViewHOC = extend(CategoryView);
const CategoryContainerHOC = extend(CategoryContainer);

export default CategoryContainerHOC

export {
  CategoryView,
  CategoryContainer,
  CategoryViewHOC,
  CategoryContainerHOC,
};
