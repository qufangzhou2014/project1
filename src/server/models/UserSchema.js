const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
      type: String,
     
  },
  lastname:{
      type: String,
    
  },
  sex: {
      type: String,

  },
  age: {
      type: String
  },
  password: {
      type: String
  },
  repeatpassword: {
      type: String
  }
});

const User = mongoose.model('userinfo', UserSchema);
module.exports = User; 