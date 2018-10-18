/* eslint-env node */

const { dasherize } = require ('ember-cli-string-utils');
const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  description: 'Generates a style file for a route',

  availableOptions: Object.freeze ([
    { name: 'path', type: String, default: ''},
    { name: 'reset-namespace', type: Boolean }
  ]),

  fileMapTokens () {
    return {
      __stylepath__: function (options) {
        let parts = options.locals.moduleName.split ('/');
        let filename = parts[parts.length - 1];

        parts[parts.length - 1] = '_' + filename;

        return parts.join ('/');
      }
    };
  },

  locals (options) {
    let moduleName = options.args[1];

    if (options.resetNamespace)
      moduleName = moduleName.split('/').pop();

    let dasherizedModuleName = dasherize (moduleName);

    return {
      moduleName: dasherizedModuleName,
      styleClassName: dasherizedModuleName.replace (/[/]/g, '-')
    };
  },

  afterInstall () {
    return this._locals (this.options)
      .then (({fileMap: { __root__ }}) => this.insertIntoFile (`${__root__}/styles/_routes.scss`, `@import "routes/${this.options.args[1]}";\n`))
  }
});
