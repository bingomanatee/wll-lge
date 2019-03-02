import React from 'react';
import pt from 'prop-types';

import {Select} from '../style';

const noop = a => a;

const CategoryChooserView = ({value, categories, onChange}) => (
  <div>
    <Select value={value} onChange={(event) => onChange(event.target.value)}>
      {categories.map(cat => (<option key={cat.directory} value={cat.directory}>{cat.title}</option>))}
    </Select>
  </div>
);

CategoryChooserView.propTypes = {
  value: pt.string,
  categories: pt.array,
  onChange: pt.func,
};

CategoryChooserView.defaultProps = {
  value: '',
  categories: [],
  onChange: noop,
};

export default CategoryChooserView;
