import React from 'react';
import pt from 'prop-types';

const noop = a => a;

const ComponentNameView = ({ componentNameFoo, setComponentNameFoo }) => (
  <div>
    <b>ComponentName:</b>
    <input
      type="text"
      name="componentName-foo-input"
      value={componentNameFoo}
      onChange={event => setComponentNameFoo(event.target.value)}
    />
  </div>
);

ComponentNameView.propTypes = {
  componentNameFoo: pt.string,
  setComponentNameFoo: pt.func,
};

ComponentNameView.defaultProps = {
  componentNameFoo: '',
  setComponentNameFoo: noop,
};

export default ComponentNameView;
