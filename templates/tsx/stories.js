module.exports = {
  render: (data) => {
    return `// External dependencies
import React from 'react';
import { storiesOf } from '@storybook/react';

// Local
import ${data.component.fileName}Container from './${data.container.fileName}';

storiesOf('${data.component.fileName}', module)
  .add('default', () =>
<${data.component.fileName}Container />
);

`;
  }
};
