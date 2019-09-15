#!/usr/bin/env node

const chalk  = require('chalk');
const clear  = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const [,, ...args] = process.argv;
const inquirer  = require('./lib/inquirer');

const run = async () => {
  // Brand
  console.log(chalk.white(`${chalk.underline.bold.blue("C")}reate ${chalk.underline.bold.blue("R")}eact ${chalk.underline.bold.blue("C")}omponent`))

  // Questions
  const componentExt = await inquirer.askComponentExtension();
  const styleExt = await inquirer.askStyleExtension();
  const name = await inquirer.askComponentName(componentExt);
  const story = await inquirer.askStorybook(componentExt);
  const submit = await inquirer.askSubmit({
    componentExt: componentExt.componentExt,
    styleExt: styleExt.styleExt,
    name: name.name,
    story: story.story,
  });

  console.log(submit);
};

clear();

run();
