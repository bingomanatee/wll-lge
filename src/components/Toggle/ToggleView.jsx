import React from 'react';
import pt from 'prop-types';
import {ToggleButton} from '../../style';
const noop = a => a;

const ToggleView = ({ article, field }) => {
  if (!(field && article)) return '';
  const active = article[field];
  return <ToggleButton data-on={active}>
    {active ? 'YES' : 'NO'}
  </ToggleButton>;
};

export default ToggleView;
