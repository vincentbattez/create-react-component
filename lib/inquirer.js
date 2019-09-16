const inquirer      = require('inquirer');
const chalk         = require('chalk');
const text          = require('../helpers/text');

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

    return inquirer.prompt({
      name: 'submit',
      type: 'confirm',
      message: 'Do you want create: \n' +
        text.formatResult(list)
    });
  },
};
