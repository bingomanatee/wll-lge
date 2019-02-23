import React from 'react';
import pt from 'prop-types';
import {
  ArticleFrame,
  ArticleItem,
  ArticleList,
  ArticleListWrapper,
  ButtonList,
  EditButton,
  FuzzyBox,
  PageHead,
  Text,
  TableBox
} from '../style';

const noop = a => a;

const CategoryEditView = ({ categoryArticles }) => (
  <div>
    <PageHead>Category Articles</PageHead>
    <FuzzyBox>
      <TableBox>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Directory</th>
              <th>Intro</th>
              <th>Published</th>
              <th>On Homepage</th>
            </tr>
          </thead>
          <tbody>
            {categoryArticles.map(a => (<tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.directory}</td>
              <td>{a.intro || '--'}</td>
              <td>{a.published? 'YES': ''}</td>
              <td>{a.on_homepage? 'YES': ''}</td>
            </tr>))}
          </tbody>
        </table>
      </TableBox>
    </FuzzyBox>
  </div>
);

CategoryEditView.propTypes = {
  categoryEditFoo: pt.string,
  setCategoryEditFoo: pt.func,
};

CategoryEditView.defaultProps = {
  categoryEditFoo: '',
  setCategoryEditFoo: noop,
};

export default CategoryEditView;
