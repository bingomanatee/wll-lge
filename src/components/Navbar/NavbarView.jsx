import React from 'react';
import pt from 'prop-types';
import sc from 'styled-components';
import {Link} from 'react-router-dom';

const CategoryView = sc(Link)`
border: 8px solid transparent;
border-image: url(/images/category/category-back.png) 8;
color: #5B7042;
background: black;
padding-right: 3px;
padding-bottom: 2px;
text-decoration: none;
text-align: center;
text-transform: uppercase;font-family: 'Merriweather Sans', sans-serif;
font-weight: 700;
font-size: 1rem;
line-height: 100%;

:hover {
border-image: url(/images/category/category-back-active.png) 8;
color: white;
}
@media(min-width: 800px) {
margin-right: 4px;
margin-bottom: 4px;
white-space: nowrap;
}
`;

const CategoryList = sc.div`
clear: both;
@media(min-width: 800px) {
flex-wrap: wrap;
padding: 0 1rem;
display: flex;
flex-direction: row;
justify-content: flex-start;
}
`;

const NavbarView = ({categories, gotoCategory}) => (
  <div><CategoryList>
    <CategoryView key="home" to="/">Home</CategoryView>
    {categories && categories.filter(cat => cat.published).map((cat) => {
      return <CategoryView key={cat.id}
        to={'/categories/' + encodeURIComponent(cat.path)}
        onClick={() => gotoCategory(cat)}>{cat.title}
      </CategoryView>;
    })}
  </CategoryList></div>
);

NavbarView.propTypes = {
  categories: pt.array,
  gotoCategory: pt.func,
};

NavbarView.defaultProps = {
  categories: []
};

export default NavbarView;
