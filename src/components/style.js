import sc from 'styled-components';
import {Link} from 'react-router-dom';
import {SMALL_NAV, LARGE_NAV} from '../constants';

const BUTTON_MASK = 'rgba(200,200,200,0.666)';
const CONTENT_MASK = 'rgb(255,255,255)';
const LIGHT_GREY = 'rgb(200,200,200)';
const ARTICLE_LINK_BACK = 'rgba(128,128,128,0.95)';
const HEADLINE_FONT = '\'Merriweather Sans\', sans-serif';

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

export const ArticleListWrapper = sc.div`
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
background: ${ARTICLE_LINK_BACK};
color: white;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 300;
font-size: 1rem;
color: white !important;
padding: 0.2rem 0.5rem;
margin: 0.333rem 0.25rem;
@media(max-width: ${SMALL_NAV}) {
padding: 2px;
margin: 0;
}
@media(min-width: ${LARGE_NAV}) {
padding: 0.5rem 1rem;
font-size: 1.2rem;
}
:hover {
text-decoration: underline;
}
&.unpublished {
text-decoration: line-through
}
`;
export const ArticleText = sc(Link)`
display: block;
text-decoration: none;
background: transparent;
color: white;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 200;
font-size: 1rem;
color: white !important;
padding: 0.2rem 0.5rem;
margin: 0.333rem 0.25rem;
margin-left: -0.666rem;
@media(max-width: ${SMALL_NAV}) {
padding: 2px;
margin: 0;
}
@media(min-width: ${LARGE_NAV}) {
padding: 0.5rem 1rem;
font-size: 1.2rem;
}
:hover {
text-decoration: underline;
}
&.unpublished {
text-decoration: line-through
}
`;

export const UserIcon = sc.div`
display: inline-block;
height: 1.5rem;
width: 1.5rem;
background: url(${(props) => props.picture});
background-size: cover;
margin-right: 0.2rem;
`;

export const ContentEditor = sc.textarea`
height: 60vh;
padding: 1rem;
font-size: 1.25rem;
font-family: 'Courier New', Monaco, Courier, monospace;
@media(min-width: ${LARGE_NAV}) {
font-size: 1.75rem;
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
a {
text-decoration: none;
color: rgba(255,255,255,0.8);
text-shadow: none;
font-weight: 200;
font-size: 0.95em;
:hover {
  text-decoration: underline;
}
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

export const FuzzyBox = sc.div`
padding: 0.5rem 2rem;
background-color: ${CONTENT_MASK};
-webkit-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
-moz-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
display: flex;
flex-direction: column;
align-items: stretch;
`;

export const TableBox = sc.div`
display: flex;
flex-direction: column;
align-items: stretch;
`;

export const Text = sc.div`
font-family: 'Cormorant Garamond',Georgia,serif;
font-size: 1.1rem;
pre {
font-size: 0.8rem;
@media(min-width: ${LARGE_NAV}) {
font-size: 1rem;
}
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
@media(min-width: ${LARGE_NAV}) {
font-size: 1.25rem;
}
`;

export const NavbarFrame = sc.div`
flex: 0;
margin-top: 4px;
`;

export const UserButton = sc.div`
background-color: ${BUTTON_MASK};
color: black;
display: flex;
flex-direction: row;
align-items: center;
padding: 0rem 0.25rem;
text-decoration: none;
text-align: center;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 400;
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

export const ButtonList = sc.div`
display: flex;
flex-direction: row;
justify-content: space-around;
padding: 0 0.5rem;
clear: both;
margin: 1rem;
width: 100%;
`;


export const FormItem = sc.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: baseline;
margin-bottom: 0.5rem;
font-family: 'Merriweather Sans', sans-serif;
`;

export const FormLabel = sc.div`
font-weight: 600;
padding: 0.25rem;
flex-grow: 1;
text-align: right;
margin-right: 2rem;
`;

export const Input = sc.input`
padding: 0.25rem;
border: 1px solid black;
border-radius: 1px;
flex-grow: 1.25;
font-size: 1.25rem;
font-family: 'Courier New', Monaco, Courier, monospace;
@media(min-width: ${LARGE_NAV}) {
font-size: 1.75rem;
}
`;
export const CheckboxWrapper = sc.div`
font-weight: 600;
padding: 0.25rem;
border: 1px solid black;
border-radius: 1px;
flex-grow: 1.25;
`;

export const ToggleButton = sc.button`
background-color: ${(props) => {
    const active = ('data-on' in props) ? props['data-on'] : null;
    if (active === null) return 'grey';
    if (active) return 'darkgreen';
    return 'darkred';
  }};
font-size: 1rem;
color: white;
text-transform: uppercase;
outline: none;
width: 60px;
tex-align: center;
padding: 0.5rem 1rem;
-webkit-appearance: none;
-moz-appearance: none;
border: 1px solid rgba(0,0,0,0);
:hover {
color: yellow;
}
`;

export const EditButton = sc.button`
background-color: black;
font-size: 1rem;
color: ${LIGHT_GREY};
text-transform: uppercase;
outline: none;
border: 1px solid rgba(0,0,0,0);
padding: 0.5rem 1rem;
-webkit-appearance: none;
-moz-appearance: none;
:hover {
color: white;
background-color: blue;
}
`;

export const CategoryView = sc(Link)`
background-color: ${BUTTON_MASK};
color: black;
display: block;
padding: 0.2rem 0.333rem;
text-decoration: none;
text-align: center;
text-transform: uppercase;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 800;
line-height: 100%;
margin-right: 1rem;
white-space: nowrap;
font-size: 1rem;
@media(max-width: ${SMALL_NAV}) {
font-size: 0.8rem;
}
@media(min-width: ${LARGE_NAV}) {
padding: 0.5rem 0.5rem;
font-size: 1.2rem;
}
:hover {
color: white;
}
`;

export const Line = sc.hr`
border-top: 1px solid black;
margin: 0.5rem 0;
`;

export const CategoryList = sc.div`
clear: both;
margin:0.5rem 1rem ;
flex-wrap: wrap;
padding: 0 1rem;
display: flex;
flex-direction: row;
justify-content: center;
`;

