var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
        type: String,
        required: true
      }
});

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
}
