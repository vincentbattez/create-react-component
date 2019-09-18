module.exports = {
  "ext": {
    "component": "tsx",
    "style": "scss"
  },
  "dist": "src/component",
  "templates": {
    "component": require('./templates/tsx/component'),
    "container": require('./templates/tsx/container'),
    "style": require('./templates/tsx/style'),
    "stories": require('./templates/tsx/stories'),
    "type": require('./templates/tsx/type'),
    "index": require('./templates/tsx/index'),
    "test": require('./templates/tsx/test'),
  }
};
