const { Schema, model } = require("mongoose")

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
  },
  avatar: {
    type: String,
    default: 'https://i.stack.imgur.com/l60Hf.png'
  },
  role: {
    type: String,
    enum: ['USER', 'EDITOR', 'ADMIN'],
    default: 'USER',
  },
  points: {
    type: Number,
    default: 0
  }
},
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User