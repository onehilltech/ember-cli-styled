/* eslint-env node */

const { Blueprint } = require('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend({
  addons: [{ name: 'ember-cli-sass' }],

  afterInstall() {
    return this._super
      .call(this, ...arguments)
      .then(() => this._locals(this.options))
      .then(({ fileMap: { __root__ } }) =>
        this.insertIntoFile(
          `${__root__}/styles/app.scss`,
          '\n@import "_styled";\n'
        )
      );
  },
});
