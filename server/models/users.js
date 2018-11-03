const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {type: String, required: true },
    username: {type: String, required: true },
    email: {type: String},
    address : { type: Object, required: true},
    phone: {type: String, required: true},
    website: {type: String, required: true},
    company: {type: Object, required: true}
  }
)