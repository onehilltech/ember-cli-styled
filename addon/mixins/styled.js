/* global document */

import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';

export default Mixin.create ({
  classNameForRoute: computed ('routeName', function () {
    const routeName = this.routeName;
    const className = dasherize (routeName).replace (/[.]/g, '-');

    return `route__${className}`;
  }),

  activate () {
    this._super (...arguments);

    // Add the class name for this route so we can add styles.
    let classNameForRoute = this.classNameForRoute;
    document.body.classList.add (classNameForRoute);
  },

  deactivate () {
    this._super (...arguments);

    // Remove the class name for this route so we can remove styles.
    let classNameForRoute = this.classNameForRoute;
    document.body.classList.remove (classNameForRoute);
  }
});
