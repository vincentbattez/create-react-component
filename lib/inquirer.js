const inquirer = require('inquirer');
const files    = require('./files');
const chalk  = require('chalk');

const formatResult = (list) => {
  return list.map(item => {
    return chalk.green(`  (+) ${item}\n`)
  })
};

const buildList = ({ componentExt, styleExt, name, story }) => {
  const list = [];
  // component
  list.push(`${name}.${componentExt}`);

  // container
  list.push(`${name}.container.${componentExt}`);

  // style
  list.push(`${name}.${styleExt}`);

  // stories
  if (story)
    list.push(`${name}.stories.${componentExt}`);

  // type
  if (files.canCreateTypeFile(componentExt))
    list.push(`${name}.type.ts`);

  // index
  list.push(`index.${files.buildExtension(componentExt)}`);


  return list
};

module.exports = {
  askComponentExtension: () => {
    return inquirer.prompt({
      name: 'componentExt',
      type: 'list',
      message: 'Extension:',
      choices: [ 'js', 'jsx', 'ts', 'tsx' ],
      default: 'jsx',
    });
  },
  askStyleExtension: () => {
    return inquirer.prompt({
      name: 'styleExt',
      type: 'list',
      message: 'Style extension:',
      choices: [ 'css', 'scss', 'less', 'sass' ],
      default: 'scss',
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
    const list = buildList(data);

    return inquirer.prompt({
      name: 'submit',
      type: 'confirm',
      message: 'Do you want create: \n' +
        formatResult(list)
    });
  },

};
