import React from 'react';

export const mockComponent = (componentName) => (props) => {
  const mockProps = {};
  Object.keys(props)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      const value = JSON.stringify(props[key]);
      mockProps[`test-prop-${key.toLowerCase()}`] = value;
    });
  return (<div data-originalcomponent={componentName} {...mockProps}>{props.children}</div>);
};
