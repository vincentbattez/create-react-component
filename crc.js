#!/usr/bin/env node

// external dependencies
const clear  = require('clear');
const { join } = require('path');
const { cloneDeep } = require('lodash');
const chalk         = require('chalk');

global.config = require('rc')(
  'crc',
  cloneDeep(require('./default')),
);
config.hasCustomConfig = require('rc')('crc').config !== undefined;

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
  let componentExt;
  if (config.hasCustomConfig && config.ext && config.ext.component) {
    console.log(chalk.blue.bold('!') + chalk.bold(` Component extension from the config: ${chalk.blue.bold(config.ext.component)}`));
    componentExt = {componentExt: config.ext.component}
  } else {
    componentExt = await inquirer.askComponentExtension();
  }

  let styleExt;
  if (config.hasCustomConfig && config.ext && config.ext.style) {
    console.log(chalk.blue.bold('!') + chalk.bold(` Style extension from the config: ${chalk.blue.bold(config.ext.style)}`));
    styleExt = {styleExt: config.ext.style}
  } else {
    styleExt = await inquirer.askStyleExtension();
  }

  const name = await inquirer.askComponentName(componentExt);

  // console.log(config.hasCustomConfig, config.hasOwnProperty('stories'))
  let story;
  if (config.hasCustomConfig && config.hasOwnProperty('stories')) {
    console.log(chalk.blue('!') + chalk.bold(` Create stories from the config: ${chalk.blue.bold(config.stories)}`));
    story = {stories: config.stories}
  } else {
    story = await inquirer.askStorybook(componentExt);
  }

  const submit = await inquirer.askSubmit({
    componentExt: componentExt.componentExt,
    styleExt: styleExt.styleExt,
    name: name.name,
    story: story.story,
  });

  // Creations
  if (!submit.submit) {
    return false
  }

  // Create component file
  files.createFile(
    perform.component.fullPath,
    config.templates.component.render(perform)
  );
  // Create type file
  files.createFile(
    perform.type.fullPath,
    config.templates.type.render(perform)
  );
  // Create style file
  files.createFile(
    perform.style.fullPath,
    config.templates.style.render(perform)
  );
  // Create container file
  files.createFile(
    perform.container.fullPath,
    config.templates.container.render(perform)
  );
  // Create index file
  files.createFile(
    perform.index.fullPath,
    config.templates.index.render(perform)
  );
  // Create test file
  files.createFile(
    perform.test.fullPath,
    config.templates.test.render(perform)
  );
  // Create test file
  files.createFile(
    perform.stories.fullPath,
    config.templates.stories.render(perform)
  );

  text.successMessage(perform.distPath)
};

clear();

run();
