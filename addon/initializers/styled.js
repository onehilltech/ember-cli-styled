import Styled from 'ember-cli-styled/mixins/styled';
import Route from '@ember/routing/route';

export function initialize(/* application */) {
  Route.reopen (Styled);
}

export default {
  initialize
};
