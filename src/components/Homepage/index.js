import HomepageContainer from './HomepageContainer';
import HomepageView from './HomepageView';
import extend from './extend';

const HomepageViewHOC = extend(HomepageView);
const HomepageContainerHOC = extend(HomepageContainer);

export default HomepageContainerHOC

export {
  HomepageView,
  HomepageContainer,
  HomepageViewHOC,
  HomepageContainerHOC,
};
