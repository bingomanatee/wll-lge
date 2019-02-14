import sc from "styled-components";
import {Link} from "react-router-dom";
import {SMALL_NAV} from "../constants";

const BUTTON_MASK = 'rgba(200,200,200,0.5)';
const CONTENT_MASK = 'rgb(255,255,255)';
const ARTICLE_LINK_BACK = 'rgba(128,128,128,0.95)';
const HEADLINE_FONT = `'Merriweather Sans', sans-serif`;

export const SiteHeadline = sc.h1`
text-align: center;
text-transform: uppercase;
font-family: ${HEADLINE_FONT};
color: black;
font-weight: 300;
font-size: 2rem;
margin: 0;
padding: 0;
line-height: 100%;
background-color: ${BUTTON_MASK};
text-shadow: 2px 2px 2px #FFFFFF;
@media(max-width: 800px) {
  font-size: 1rem;
  font-weight: 800;
}
`;

export const ArticleWrapper = sc.div`
width: 100%;
@media(min-width: 800px) {
overflow-y: auto
}`;

export const ArticleList = sc.div`
@media(min-width: ${SMALL_NAV}) {
display: flex;
flex-direction: row;
justify-content: center;
flex-wrap: wrap;
}
`;

export const ArticleItem = sc(Link)`
display: block;
text-decoration: none;
color: white;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 300;
color: white !important;
padding: 0.2rem 0.5rem;
@media(min-width: ${SMALL_NAV}) {
margin: 0.25rem 1rem;
}
background: ${ARTICLE_LINK_BACK};
:hover {
text-decoration: underline;
}
`;


export const PageHead = sc.h1`
font-family: ${HEADLINE_FONT};
color: white;
font-weight: 800;
font-size: 2rem;
text-align: center;
text-transform: uppercase;
margins: 0;
  padding: 0 4rem;
text-shadow: 2px 2px 2px #000000;
background-color: ${BUTTON_MASK};
@media(max-width: ${SMALL_NAV}) {
font-size: 1rem;
padding: 0;
}
`;

export const ArticleFrame = sc.article`
padding: 2rem 3rem;
padding-top: 0; 
@media(max-width: ${SMALL_NAV}) {
padding: 0;
}
`;

const n1 = '4px';
const n2 = '4px';

export const Text = sc.div`
padding: 0.5rem 2rem;
background-color: ${CONTENT_MASK};
-webkit-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
-moz-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
font-family: 'Cormorant Garamond',Georgia,serif;
font-size: 1.1rem;

pre {
font-size: 0.8rem;
}
h1, h2, h3, h4, h5, h6 {
font-family: ${HEADLINE_FONT};
font-size: 1rem;
padding: 0;
margin: 0;
}
h1 {
font-size: 1.75rem;
text-shadow: 2px 2px 2px black;
color: white;
text-transform: uppercase;
margin-bottom: 0.5rem;
}
h2 {
text-shadow: 2px 2px 2px white;
font-size: 1.5rem;
margin-bottom: 0.25rem;
}
`;

export const NavbarFrame = sc.div`
flex: 0;
margin-top: 4px;
`;

export const CategoryView = sc(Link)`
background-color: ${BUTTON_MASK};
color: black;
display: block;
padding: 0rem 0.25rem;
text-decoration: none;
text-align: center;
text-transform: uppercase;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 800;
font-size: 0.8rem;
line-height: 100%;
margin-right: 1rem;
white-space: nowrap;
@media(min-width: ${SMALL_NAV}) {
font-size: 1rem;
}
:hover {
color: white;
}
`;

export const CategoryList = sc.div`
clear: both;
margin:0.5rem 1rem ;
@media(min-width: 800px) {
flex-wrap: wrap;
padding: 0 1rem;
display: flex;
flex-direction: row;
justify-content: center;
}
`;

