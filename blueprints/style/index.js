/* eslint-env node */

const path = require ('path');
const StringUtil = require ('ember-cli-string-utils');

module.exports = {
  description: 'Generates a material design style for an existing route',

  availableOptions: [
    { name: 'path', type: String, default: ''},
    { name: 'reset-namespace', type: Boolean }
  ],

  fileMapTokens: function() {
    return {
      __root__: function(options) {
        if (options.inRepoAddon) {
          return path.join('lib', options.inRepoAddon, 'addon');
        }

        if (options.inDummy) {
          return path.join('tests', 'dummy', 'app');
        }

        if (options.inAddon) {
          return 'addon';
        }

        return 'app';
      },

      __stylepath__: function (options) {
        let parts = options.dasherizedModuleName.split ('/');
        let filename = parts[parts.length - 1];

        parts[parts.length - 1] = '_' + filename;

        return parts.join ('/');
      }
    };
  },

  locals: function(options) {
    let moduleName = options.entity.name;

    if (options.resetNamespace) {
      moduleName = moduleName.split('/').pop();
    }

    let dasherizedModuleName = StringUtil.dasherize(moduleName);

    return {
      moduleName: dasherizedModuleName,
      styleClassName: dasherizedModuleName.replace (/[/]/g, '-')
    };
  },

  afterInstall () {
    return this.insertIntoFile ('app/styles/_routes.scss', `@import "routes/${this.options.args[1]}";\n`);
  }
};
