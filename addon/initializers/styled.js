export function initialize (app) {
  app.inject ('route:application', 'styled', 'service:styled');
}

export default {
  initialize
};
