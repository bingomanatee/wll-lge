import React from 'react';
import pt from 'prop-types';

const noop = a => a;

const CategoryEditView = ({ categoryEditFoo, setCategoryEditFoo }) => (
  <div>
    <b>CategoryEdit:</b>
    <input
      type="text"
      name="categoryEdit-foo-input"
      value={categoryEditFoo}
      onChange={event => setCategoryEditFoo(event.target.value)}
    />
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
