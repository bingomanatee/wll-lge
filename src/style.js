import sc from 'styled-components';
import {Link} from 'react-router-dom';
import {SMALL_NAV, MEDIUM_NAV, LARGE_NAV, SMALL_LEFT_MARGIN} from './constants';

const BUTTON_MASK = 'rgba(200,200,200,0.333)';
const CONTENT_MASK = 'rgb(255,255,255)';
const LIGHT_GREY = 'rgb(200,200,200)';
const ARTICLE_LINK_BACK = 'rgba(128,128,128,0.95)';
const HEADLINE_FONT = '\'Merriweather Sans\', sans-serif';
const USER_LINK = 'rgb(200,200,200)';
const CATEGORY_TEXT_COLOR = 'rgb(200,200,200)';
const CATEGORY_LIST = 'rgb(0,0,0,0.8)';
const CATEGORY_LIST_TEXT = 'rgb(255,255,255,0.8)';
const ARTICLE_LINK = 'rgb(225,225,255)';

const TEXT_FONT_SIZE = '1.25rem';
const TEXT_FONT_SIZE_SMALL = '1rem';
const TEXT_FONT_SIZE_LARGE = '1.5rem';
const HEADLINE_FONT_SIZE = '2rem';
const HEADLINE_FONT_SIZE_LARGE = '3rem';
const HEADLINE_FONT_SIZE_SMALL = '1.25rem';
const SUB_HEADLINE_FONT_SIZE = '1.5rem';
const SUB_HEADLINE_FONT_SIZE_LARGE = '1.75rem';

export const SiteHeadline = sc.h1`
text-align: center;
text-transform: uppercase;
font-family: ${HEADLINE_FONT};
color: white;
font-weight: 100;
font-size: 2.5rem;
margin: 0;
padding: 0;
line-height: 100%;
text-shadow: 1px 1px 2px #000000;
@media(max-width: 800px) {
  font-size: 1.5rem;
  font-weight: 800;
}
`;

export const ArticleListWrapper = sc.div`
@media(max-width: ${MEDIUM_NAV}) {
margin-left: ${SMALL_LEFT_MARGIN};
}
@media(min-width: ${MEDIUM_NAV}) {
overflow-y: visible;
}`;

export const ArticleItemWrapper = sc.div`
position: absolute;
flex-grow: 1;
`;

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
position: relative;
color: ${ARTICLE_LINK};
font-family: 'Merriweather Sans', sans-serif;
font-weight: 300;
font-size: ${TEXT_FONT_SIZE};
padding: 0.2rem 0.5rem;
margin: 0.333rem 0.25rem;
text-shadow: 1px 1px 0px #000000;
@media(max-width: ${SMALL_NAV}) {
padding: 2px;
margin: 0;
font-size: ${TEXT_FONT_SIZE_SMALL};
}
@media(min-width: ${LARGE_NAV}) {
padding: 0.5rem 1rem;
font-size: ${TEXT_FONT_SIZE_LARGE};
}
:hover {
background: ${ARTICLE_LINK_BACK};
text-decoration: underline;
div[data-role='text'] {
display: block;
}
}
&.unpublished {
text-decoration: line-through
}
`;
export const ArticleText = sc.div`
display: none;
position: absolute;
left: 1rem;
top: 2rem;
width: 20rem;
text-decoration: none;
background: white;
border-radius: 2px;
z-index: 1000;
color: white;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 200;
font-size: ${TEXT_FONT_SIZE};
color: black;
text-shadow: none;
padding: 0.2rem 0.5rem;
margin: 0.333rem 0.25rem;
margin-left: -0.666rem;
@media(max-width: ${SMALL_NAV}) {
padding: 2px;
margin: 0;
}
@media(min-width: ${LARGE_NAV}) {
padding: 0.5rem 1rem;
font-size: ${TEXT_FONT_SIZE_LARGE};
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
height: 40vh;
padding: 1rem;
font-size: 1.25rem;
font-family: 'Courier New', Monaco, Courier, monospace;
@media(min-width: ${LARGE_NAV}) {
font-size: 1.75rem;
}
`;

export const PageHead = sc.h1`
font-family: ${HEADLINE_FONT};
font-size: ${HEADLINE_FONT_SIZE};
color: white;
font-weight: 800;
text-align: center;
margins: 0;
text-shadow: 2px 2px 2px #000000;
@media(min-width: ${MEDIUM_NAV}) {
  font-size: ${HEADLINE_FONT_SIZE_LARGE};
}@media(max-width: ${SMALL_NAV}) {
  font-size: ${HEADLINE_FONT_SIZE_SMALL};
}
a {
  text-decoration: none;
  color: ${ARTICLE_LINK};
  text-shadow: none;
  font-weight: 200;
  :hover {
    text-decoration: underline;
  }
}
`;

export const CategoryHead = sc.h1`
font-family: ${HEADLINE_FONT};
color: white;
font-weight: 800;
font-size: 2rem;
text-transform: uppercase;
text-shadow: 2px 2px 2px #000000;
text-align: right;
margins: 0;
padding: 0;
flex-basis: 50%;
flex: 1;
@media(max-width: ${MEDIUM_NAV}){
text-align: center;
margin-left: ${SMALL_LEFT_MARGIN};
}
@media(max-width: ${SMALL_NAV}){
text-align: left;

}
`;
export const CategoryHeadFrame = sc.section`
display: flex;
flex-direction: row;
justify-content: stretch;
align-items: baseline;
@media(max-width: ${MEDIUM_NAV}){
flex-direction: column;
align-items: stretch;
}
`;

export const ArticleFrame = sc.article`
@media(max-width: ${SMALL_NAV}) {
padding: 0;
}
`;
export const CategoryTextFrame = sc.article `
margin-left:1rem;
flex: 1;
@media(max-width: ${MEDIUM_NAV}) {
display: none;
}
`;

const n1 = '18px';
const n2 = '9px';

export const FuzzyBox = sc.div`
padding: 0.5rem 2rem;
background-color: ${CONTENT_MASK};
-webkit-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
-moz-box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
box-shadow: 0px 0px ${n1} ${n2} ${CONTENT_MASK};
display: flex;
flex-direction: column;
align-items: center;
margin: 0.5rem 0;
`;

export const TableBox = sc.div`
display: flex;
flex-direction: column;
align-items: stretch;
`;

export const Text = sc.div`
font-family: 'Lora',Georgia,serif;
font-size: ${TEXT_FONT_SIZE};
max-width: ${LARGE_NAV};
@media(max-width: ${SMALL_NAV}) {
  font-size: ${TEXT_FONT_SIZE_SMALL};
}
@media(min-width: ${LARGE_NAV}) {
  font-size: ${TEXT_FONT_SIZE_LARGE};
}

p {
  margin: 0.5em 0;
}
pre {
  font-size: 1rem;
  @media(min-width: ${LARGE_NAV}) {
    font-size: 1.2rem;
  }
}
h1, h2, h3, h4, h5, h6 {
font-family: ${HEADLINE_FONT};
font-size: ${SUB_HEADLINE_FONT_SIZE};
padding: 0;
margin: 0;
@media(min-width: ${LARGE_NAV}) {
font-size: ${SUB_HEADLINE_FONT_SIZE_LARGE};
}
h1 {
font-size: ${HEADLINE_FONT_SIZE};
text-shadow: none;
color: black;
margin-bottom: 0.5rem;
@media(min-width: ${LARGE_NAV}) {
font-size: ${HEADLINE_FONT_SIZE_LARGE};
}
}
h2 {
text-shadow: 2px 2px 2px white;
font-size: 1.5rem;
margin-bottom: 0.25rem;
}
li {
padding-left: 0.5em;
margin-bottom: 0.333em;
}
ol, ul {
padding-left: 2em;
}
`;

export const TextCategory = sc.div`
font-family: ${HEADLINE_FONT};
color: ${CATEGORY_TEXT_COLOR};
p {
margin: 0.5em 0;
}
font-size: 1.25rem;
pre {
font-size: 1rem;
@media(min-width: ${LARGE_NAV}) {
font-size: 1.2rem;
font-weight: 100;
}
}
li {
padding-left: 0.5em;
}
ol, ul {
padding-left: 2em;
}
h1, h2, h3, h4, h5, h6 {
font-family: ${HEADLINE_FONT};
font-size: 1rem;
padding: 0;
margin: 0;
color: white;
}
h1 {
font-size: 1.75rem;
text-shadow: none;
text-transform: uppercase;
margin-bottom: 0.5rem;
}
h2 {
text-shadow: 2px 2px 2px white;
font-size: 1.5rem;
margin-bottom: 0.25rem;
}
@media(min-width: ${LARGE_NAV}) {
font-size: 1.33rem;
}
`;

export const NavbarFrame = sc.div`
flex: 0;
margin-top: 4px;
`;

export const UserButton = sc.div`
color: ${USER_LINK};
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
background-color: ${BUTTON_MASK};
color: white;
}
`;

export const UserNav = sc.div`
clear: both;
margin:0.5rem 1rem;
flex-wrap: wrap;
display: flex;
flex-direction: row;
justify-content: flex-end;
`;


export const UserLink = sc(Link)`
color: ${USER_LINK};
display: block;
padding: 0.2rem 0.333rem;
text-decoration: none;
text-align: center;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 100;
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
background-color: ${BUTTON_MASK};
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


export const FormItem = sc.tr`
margin-bottom: 0.5rem;
font-family: 'Merriweather Sans', sans-serif;
`;

export const FormLabel = sc.th`
font-weight: 600;
padding: 0.25rem;
text-align: right;
margin-right: 2rem;
white-space: nowrap;
font-family: 'Merriweather Sans', sans-serif;
`;
export const FormError = sc.p`
font-weight: 300;
padding: 0;
margin: 0;
text-align: left;
white-space: nowrap;
font-family: 'Merriweather Sans', sans-serif;
color: ${({level}) => {
    if (level === 'war') return 'darkorange';
    return 'darkred';
  }};
`;

export const FormContainer = sc.table`
width: 100%;
`;

export const FormContent= sc.td`
width: 80%;
`;

export const Input = sc.input`
padding: 0.25rem;
border: 1px solid black;
border-radius: 1px;
width: 100%;
font-size: 1.25rem;
font-family: 'Courier New', Monaco, Courier, monospace;
@media(min-width: ${LARGE_NAV}) {
font-size: 1.75rem;
}
`;
export const Select = sc.select`
padding: 0.25rem;
border: 1px solid black;
border-radius: 1px;
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
font-family: 'Merriweather Sans', sans-serif;
font-size: 1rem;
color: ${LIGHT_GREY};
text-decoration: none;
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
export const EditLink = sc(Link)`
background-color: black;
font-family: 'Merriweather Sans', sans-serif;
font-size: 1rem;
text-decoration: none;
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
color: ${CATEGORY_LIST_TEXT};
display: block;
padding: 0.2rem 0.333rem;
text-decoration: none;
text-align: center;
font-family: 'Merriweather Sans', sans-serif;
font-weight: 400;
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
margin:0.5rem 0 ;
flex-wrap: wrap;
padding: 0 1rem;
display: flex;
flex-direction: row;
justify-content: center;
background: ${CATEGORY_LIST};
`;
