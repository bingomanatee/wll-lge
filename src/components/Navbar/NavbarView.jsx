import React from 'react';
import pt from 'prop-types';
import {NavbarFrame, SiteHeadline, CategoryList, CategoryView,UserButton, UserIcon, Line} from '../style';

const NavbarView = ({categories, gotoCategory, user, isAdmin, isEditing, userStore}) => (
  <NavbarFrame>
    <SiteHeadline>Wonderland Labs</SiteHeadline>
    <CategoryList>
      <CategoryView key="home" to="/">Home</CategoryView>
      {categories && categories.filter(cat => cat.published).map((cat) => {
        return <CategoryView key={cat.id}
          to={'/category/' + encodeURIComponent(cat.directory)}
          onClick={() => gotoCategory(cat)}>{cat.title}
        </CategoryView>;
      })}
    </CategoryList>
    <Line />
    <CategoryList>
      {user && <UserButton>
        <UserIcon {...user} />
        {user.name}
      </UserButton>}
      <UserButton
        onClick={() => {
          !user ? userStore.actions.logIn() : userStore.actions.logOut();
        }}
      >{user ? 'sign out' : 'sign in'}</UserButton>
      {isAdmin &&  <UserButton>Administer</UserButton>}
    </CategoryList>
  </NavbarFrame>
);

NavbarView.propTypes = {
  categories: pt.array,
  gotoCategory: pt.func,
};

NavbarView.defaultProps = {
  categories: []
};

export default NavbarView;
