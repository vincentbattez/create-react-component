#!/usr/bin/env node

// external dependencies
const clear  = require('clear');
const { join } = require('path');
const { cloneDeep } = require('lodash');
global.config = require('rc')(
  'crc',
  cloneDeep(require('./default'))
);

// Helpers
const text = require('./helpers/text');

// Libs
const files = require('./lib/files');
const inquirer  = require('./lib/inquirer');
const { exec } = require('child_process');


const run = async () => {
  // Brand
  text.echoBrand();

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

  // Creations
  if (!submit) {
    return false
  }

  console.log(perform)
  // files.createFile(
  //   `${path}/`,
  //   `${name.name}.${componentExt.componentExt}`,
  //
  // );

  console.log(submit);
};

clear();

run();
