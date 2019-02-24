import ToggleContainer from './ToggleContainer';
import ToggleView from './ToggleView';
import extend from './extend';

const ToggleViewHOC = extend(ToggleView);
const ToggleContainerHOC = extend(ToggleContainer);

export default ToggleContainerHOC

export {
  ToggleView,
  ToggleContainer,
  ToggleViewHOC,
  ToggleContainerHOC,
};
