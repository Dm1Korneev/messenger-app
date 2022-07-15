import React, { PropsWithChildren } from 'react';
import ReactDOMServer from 'react-dom/server';

export const mockComponent = (componentName: string) => ({ children, ...rest }: PropsWithChildren<Record<string, unknown>>) => {
  const mockProps: Record<string, unknown> = {};
  Object.keys(rest)
    .forEach((key) => {
      let value = '';
      const prop = rest[key];
      if (typeof prop === 'object' && React.isValidElement(prop)) {
        value = ReactDOMServer.renderToString(prop);
      } else {
        value = JSON.stringify(prop);
      }
      mockProps[`test-prop-${key.toLowerCase()}`] = value;
    });
  return (<div data-originalcomponent={componentName} {...mockProps}>{children}</div>);
};
