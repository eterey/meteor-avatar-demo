var transformAvatar = function(fileObj, readStream, writeStream) {
  // Transform the image into a 150x150px thumbnail
  gm(readStream, fileObj.name()).resize('150', '150').stream().pipe(writeStream);
};

Avatars = new FS.Collection('avatars', {
  stores: [ new FS.Store.GridFS('images', { transformWrite: transformAvatar }) ],
  filter: {
    allow: {
      contentTypes: ['image/*']  // allow only images in this collection
    }
  }
});

var checkPermission = function(userId, file) {
  return userId && file.metadata && file.metadata.owner === userId;
};

Avatars.allow({
  download: function() { return true; },
  insert: checkPermission,
  update: checkPermission,
  remove: checkPermission
});