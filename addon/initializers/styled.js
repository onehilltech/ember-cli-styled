export function initialize(app) {
  if (!!app.inject) {
    app.inject('route:application', 'styled', 'service:styled');
  }
}

export default {
  initialize,
};
