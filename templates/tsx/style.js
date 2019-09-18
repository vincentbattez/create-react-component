module.exports = {
  render: (data) => {
    return `.${data.component.fileName.toLowerCase()} {
}

`;
  }
};

