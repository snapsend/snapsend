//@flow
import React from 'react';
import type { Node } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from 'material-ui/styles';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint =
  document.getElementById('jss-insertion-point') || '';

export default ({ children }: { children: Node }) => {
  return (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {children}
    </JssProvider>
  );
};
