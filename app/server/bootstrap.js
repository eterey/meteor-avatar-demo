Meteor.startup(function() {
  if (!Meteor.users.find().count()) {
    Accounts.createUser({
      username: 'uzumaxy',
      email: 'uzumaxy@gmail.com',
      password: 'uzumaxy',
      profile: {
        name: 'Maxim'
      }
    });
  }
});