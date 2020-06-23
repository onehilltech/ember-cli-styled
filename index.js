'use strict';

const INCOMPATIBLE_PLUGINS = [
  'ember-cli-mdc-sass'
];

module.exports = {
<<<<<<< HEAD
  name: 'ember-cli-styled',

  setupPreprocessorRegistry (type, registry) {
    let registered = registry.registeredForType ('css');
    let mdcIndex = registered.findIndex (plugin => INCOMPATIBLE_PLUGINS.includes (plugin.name));

    if (mdcIndex !== -1) {
      registry.remove ('css', 'broccoli-sass');
      registry.remove ('css', 'ember-cli-sass');
    }
  }
=======
  name: require('./package').name
>>>>>>> b2ebb31... v3.3.0...v3.18.0
};
