const inquirer      = require('inquirer');
const chalk         = require('chalk');
const text          = require('../helpers/text');
const files         = require("../lib/files");

module.exports = {
  askComponentExtension: () => {
    return inquirer.prompt({
      name: 'componentExt',
      type: 'list',
      message: 'Extension:',
      choices: [ 'js', 'jsx', 'ts', 'tsx' ],
      default: config.ext.component,
    });
  },
  askStyleExtension: () => {
    return inquirer.prompt({
      name: 'styleExt',
      type: 'list',
      message: 'Style extension:',
      choices: [ 'css', 'scss', 'less', 'sass' ],
      default: config.ext.style,
    });
  },
  askComponentName: ({ componentExt }) => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: `Component name: (${chalk.blue('ComponentName')}.${componentExt})`,
        validate: value => {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your component name.';
          }
        }
      },
    ];

    return inquirer.prompt(questions);
  },
  askStorybook: () => {
    return inquirer.prompt({
      name: 'story',
      type: 'confirm',
      message: 'with Storybook:',
    });
  },
  askSubmit: (data) => {
    const list = text.buildList(data);

    const distPath = `${config.dist}/${data.name}`;
    const distPathInFolder = `${distPath}/${data.name}`;

    global.perform = {
      distPath: distPath,
      component: {
        fullPath: `${distPathInFolder}.${data.componentExt}`,
        fileName: `${data.name}`,
        ext:`${data.componentExt}`,
      },
      container: {
        fullPath: `${distPathInFolder}.container.${data.componentExt}`,
        fileName: `${data.name}.container`,
        ext:`${data.componentExt}`,
      },
      style: {
        fullPath: `${distPathInFolder}.${data.styleExt}`,
        fileName: `${data.name}`,
        ext:`${data.styleExt}`,
      },
      test: {
        fullPath: `${distPathInFolder}.test.${data.componentExt}`,
        fileName: `${data.name}.test`,
        ext:`${data.componentExt}`,
      },
      stories: {
        fullPath: `${distPathInFolder}.stories.${data.componentExt}`,
        fileName: `${data.name}.stories`,
        ext:`${data.componentExt}`,
      },
      type: {
        fullPath: `${distPathInFolder}.type.ts`,
        fileName: `${data.name}.type`,
        ext:`ts`,
      },
      index: {
        fullPath: `${distPath}/index.${files.buildExtension(data.componentExt)}`,
        fileName: `index`,
        ext:`${files.buildExtension(data.componentExt)}`,
      },
    };

    return inquirer.prompt({
      name: 'submit',
      type: 'confirm',
      message: 'Do you want create: \n' +
        text.formatResult(list)
    });
  },
};
