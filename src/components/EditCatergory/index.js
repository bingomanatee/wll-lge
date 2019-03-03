import EditCategoryContainer from './EditCategoryContainer';
import EditCategoryView from './EditCategoryView';
import extend from './extend';

const EditCategoryViewHOC = extend(EditCategoryView);
const EditCategoryContainerHOC = extend(EditCategoryContainer);

export default EditCategoryContainerHOC;

export {
  EditCategoryView,
  EditCategoryContainer,
  EditCategoryContainerHOC,
  EditCategoryViewHOC,
};
