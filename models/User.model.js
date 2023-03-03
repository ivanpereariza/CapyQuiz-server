const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  username: {
    type: String,
    required: [true, 'Username required']
  }
},
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User