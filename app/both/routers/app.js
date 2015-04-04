Router.configure({
  layoutTemplate: 'MasterLayout',
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
});

Router.onBeforeAction(function() {
  if (!Meteor.userId()) {
    Meteor.loginWithPassword('uzumaxy', 'uzumaxy');
  }
  this.next();
});