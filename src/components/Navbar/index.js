import NavbarContainer from './NavbarContainer';
import NavbarView from './NavbarView';
import extend from './extend';

const NavbarViewHOC = extend(NavbarView);
const NavbarContainerHOC = extend(NavbarContainer);

export default NavbarContainerHOC;

export {
  NavbarView,
  NavbarContainer,
  NavbarViewHOC,
  NavbarContainerHOC,
};
