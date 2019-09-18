module.exports = {
  render: (data) => {
    return `// External dependencies
import React, { FunctionComponent } from "react";

// Local
import "./${data.style.fileName}.${data.style.ext}"
import { ${data.component.fileName}Props } from "./${data.type.fileName}";

const ${data.component.fileName}: FunctionComponent<${data.component.fileName}Props> = (props: ${data.component.fileName}Props) => {
  return (
    <div className="${data.component.fileName.toLowerCase()}">
    </div>
  );
};

export default ${data.component.fileName};

`;
  }
};

