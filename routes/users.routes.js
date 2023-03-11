const router = require("express").Router()
const User = require("../models/User.model")

router.get('/userById/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .select({ avatar: 1, username: 1, points: 1, role: 1, email: 1, quizzes: 1 })
        .then(user => res.status(200).json(user))
        .catch(err => next(err).json({ errorMessages: ["User dont exist"] }))
})

router.get('/getUsersByPoints', (req, res, next) => {

    User
        .find()
        .select({ avatar: 1, username: 1, points: 1, quizzes: 1 })
        .sort({ points: -1 })
        .limit(30)
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
})

router.put('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { email, username, avatar, role } = req.body

    User
        .findByIdAndUpdate(id, { email, username, avatar, role }, { new: true })
        .then(user => {
            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
})

router.put('/addQuiz/:id', (req, res, next) => {

    const { id } = req.params
    const { quizzes } = req.body

    User
        .findByIdAndUpdate(id, { $addToSet: { 'quizzes': quizzes } })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

router.put('/editPoints/:id', (req, res, next) => {

    const { id } = req.params
    const { points } = req.body

    User
        .findByIdAndUpdate(id, { $inc: { 'points': points } })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})


router.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

router.get('/resetToken/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
})



module.exports = router