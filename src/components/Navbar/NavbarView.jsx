import React from 'react';
import pt from 'prop-types';
import {NavbarFrame, SiteHeadline, CategoryList, CategoryView} from '../style';

const NavbarView = ({categories, gotoCategory}) => (
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
    </CategoryList></NavbarFrame>
);

NavbarView.propTypes = {
  categories: pt.array,
  gotoCategory: pt.func,
};

NavbarView.defaultProps = {
  categories: []
};

export default NavbarView;
