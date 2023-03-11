const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    minlength: [2, 'Password should have minimun 2 characters'],
    maxlength: [25, 'Password should have maximun 25 characters']
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
  },
  quizzes: [{
    quiz: {
      ref: 'Quiz',
      type: Schema.Types.ObjectId
    },
    points: {
      type: Number,
      default: 0
    },
  }]
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, role, avatar, points, quizzes } = this
  const payload = { _id, username, email, role, avatar, points, quizzes }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}


const User = model("User", userSchema)

module.exports = User