/* eslint-env node */
module.exports = {
  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-cli-sass'}
      ],
      blueprintOptions: {
        save: true
      }
    });
  }
};
