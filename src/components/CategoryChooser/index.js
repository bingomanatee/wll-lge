import CategoryChooserContainer from './CategoryChooserContainer';
import CategoryChooserView from './CategoryChooserView';
import extend from './extend';

const CategoryChooserViewHOC = extend(CategoryChooserView);
const CategoryChooserContainerHOC = extend(CategoryChooserContainer);

export default CategoryChooserContainerHOC

export {
  CategoryChooserView,
  CategoryChooserContainer,
  CategoryChooserViewHOC,
  CategoryChooserContainerHOC,
};
