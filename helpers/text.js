const chalk  = require('chalk');

const files  = require('../lib/files');

module.exports = {
  echoBrand: () => {
    console.log(chalk.white(`${chalk.underline.bold.blue("C")}reate ${chalk.underline.bold.blue("R")}eact ${chalk.underline.bold.blue("C")}omponent`))
  },
  formatResult: (list) => {
    return list.map(item => {
      return chalk.green(`  (+) ${item}\n`)
    })
  },
  buildList: ({ componentExt, styleExt, name, story }) => {
    const list = [];
    // component
    list.push(`${config.dist}/${name}/${name}.${componentExt}`);

    // container
    list.push(`${config.dist}/${name}/${name}.container.${componentExt}`);

    // style
    list.push(`${config.dist}/${name}/${name}.${styleExt}`);

    // stories
    if (story)
      list.push(`${config.dist}/${name}/${name}.stories.${componentExt}`);

    // type
    if (files.canCreateTypeFile(componentExt))
      list.push(`${config.dist}/${name}/${name}.type.ts`);

    // index
    list.push(`${config.dist}/${name}/index.${files.buildExtension(componentExt)}`);

    return list
  },
};
