var getFileName = function (path) {
  if (_.isString(path)) {
    var index = _.first(_.reject([
      path.lastIndexOf('\\'),
      path.lastIndexOf('/')
    ], function (val) {
      return val === -1;
    }));
    if (index) {
      path = path.substring(index + 1);
    }
  }
  return path;
};

var clear = function(tmpl) {
  _.each(tmpl.findAll('input'), function (input) {
    input.value = '';
  });
};

Template.Step1.events({
  'focus #avatar-picker-filename': function (e, tmpl) {
    e.target.blur();
    tmpl.find('#avatar-picker-file').click();
  },
  'click #avatar-picker-file': function (e, tmpl) {
    clear(tmpl);
  },
  'change #avatar-picker-file': function (e, tmpl) {
    tmpl.find('#avatar-picker-filename').value = getFileName(e.target.value);
    var avatarImage = new FS.File(e.target.files[0]);
    avatarImage.metadata = { owner: Meteor.userId() };
    Avatars.insert(avatarImage, function (err) {
      if (err) {
        console.log(err);
      }
    });
  },
  'focus #avatar-pick-url input': function (e, tmpl) {
    clear(tmpl);
  }
});

Template.Step1.helpers({
  avatars: function() {
    return Avatars.find({}, {
      sort: {
        uploadedAt: -1
      }
    });
  }
});

Template.Step1.onCreated(function() {
  this.subscribe('avatars');
});