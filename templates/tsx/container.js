module.exports = {
  render: (data) => {
    return `// External dependencies
import React, { memo, FunctionComponent } from "react";

// Internal dependencies
import { ${data.component.fileName}ContainerProps } from './${data.type.fileName}'
import ${data.component.fileName} from "./${data.component.fileName}";

const ${data.component.fileName}Container: FunctionComponent<${data.component.fileName}ContainerProps> = (props: ${data.component.fileName}ContainerProps) => {
  return (
    <${data.component.fileName} />
  );
};

export default memo(${data.component.fileName}Container);

`;
  }
};

