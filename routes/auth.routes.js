const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { verifyToken } = require("../middlewares/auth.middleware")

router.post('/signup', (req, res, next) => {

    const { email, password, username, avatar } = req.body

    if (password.length < 2) {
        res.status(400).json({ errorMessages: ['Password must have at least 3 characters'] })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ errorMessages: ["User already exists."] })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username, avatar })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body;

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Provide email and password."] });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessages: ["User not found."] })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, avatar, role, points, quizzes } = foundUser;
                const payload = { _id, email, username, avatar, role, points, quizzes }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ errorMessages: ["Credentials doesn't match"] });
            }

        })
        .catch(err => next(err));
})

router.get('/verify', verifyToken, (req, res, next) => {
    res.json(req.payload)
})

module.exports = router