/* global document */

import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { dasherize } from '@ember/string';
import { difference } from 'lodash-es';

const CACHE = new WeakMap ();

function computeClassNames (tree) {
  if (!tree)
    return [];

  // Check the cache in case we have already computed the class names.
  let key = { name: tree.name };
  let classNames = CACHE.get (key);

  if (classNames !== undefined)
    return classNames;

  classNames = [];
  let current = tree;

  do {
    let { name, parent } = current;

    const className = `route__${dasherize (name).replace (/[.]/g, '-')}`;
    classNames.push (className)

    // Replace the current node with the parent node.
    current = parent;
  } while (isPresent (current));

  // Cache the class names for faster lookup.
  classNames.reverse ();
  CACHE.set (key, classNames);

  return classNames;
}

export default class StyledService extends Service {
  @service router;

  constructor () {
    super (...arguments);

    this.router.on ('routeDidChange', this._routeDidChange.bind (this));
  }

  /**
   * The route has changed.
   *
   * @param transition
   * @private
   */
  _routeDidChange (transition) {
    console.log (transition);

    const { from, to } = transition;
    let fromClassNames = computeClassNames (from);
    let toClassNames = computeClassNames (to);

    // Compute the difference between the two sets to determine what class names must be
    // removed and what class names must be added. Then, make the necessary adjustments
    // to the body html element.

    let removed = difference (fromClassNames, toClassNames);
    let added = difference (toClassNames, fromClassNames);

    document.body.classList.remove (...removed);
    document.body.classList.add (...added);
  }
}
