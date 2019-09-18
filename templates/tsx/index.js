module.exports = {
  render: (data) => {
    return `import ${data.component.fileName}Container from "./${data.container.fileName}";

export default ${data.component.fileName}Container

`;
  }
};

