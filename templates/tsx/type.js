module.exports = {
  render: (data) => {
    return `export interface ${data.component.fileName}ContainerProps {
}

export interface ${data.component.fileName}Props {
}

`;
  }
};

