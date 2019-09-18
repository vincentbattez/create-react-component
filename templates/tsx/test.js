module.exports = {
  render: (data) => {
    return `import ${data.component.fileName} from "./${data.component.fileName}";

test("Component: ${data.component.fileName}", () => {
  // Given

  // When

  // Then
});

`;
  }
};

