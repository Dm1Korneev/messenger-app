import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const mockComponent = (componentName) => (props) => {
  const mockProps = {};
  Object.keys(props)
    .filter((key) => key !== 'children')
    .forEach((key) => {
      let value = '';
      if (React.isValidElement(props[key])) {
        value = ReactDOMServer.renderToString(props[key]);
      } else {
        value = JSON.stringify(props[key]);
      }
      mockProps[`test-prop-${key.toLowerCase()}`] = value;
    });
  return (<div data-originalcomponent={componentName} {...mockProps}>{props.children}</div>);
};
