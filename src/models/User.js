const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = { name: 'User', schema: UserSchema };
