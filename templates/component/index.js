import ComponentNameContainer from './ComponentNameContainer';
import ComponentNameView from './ComponentNameView';
import extend from './extend';

const ComponentNameViewHOC = extend(ComponentNameView);
const ComponentNameContainerHOC = extend(ComponentNameContainer);

export default ComponentNameContainerHOC

export {
  ComponentNameView,
  ComponentNameContainer,
  ComponentNameViewHOC,
  ComponentNameContainerHOC,
};
