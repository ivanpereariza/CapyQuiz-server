const Quiz = require("../models/Quiz.model")
const User = require("../models/User.model")


const userById = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .select({ avatar: 1, username: 1, points: 1, role: 1, email: 1, quizzes: 1 })
        .then(user => res.status(200).json(user))
        .catch(err => next(err).json({ errorMessages: ["User dont exist"] }))
}

const getUsersByPoints = (req, res, next) => {

    User
        .find()
        .select({ avatar: 1, username: 1, points: 1, quizzes: 1 })
        .sort({ points: -1 })
        .limit(30)
        .then(users => res.status(200).json(users))
        .catch(err => next(err))
}

const getUserWithQuizzes = (req, res, next) => {

    const { id } = req.params

    const promises = [User.findById(id).lean(), Quiz.find({ owner: id })]

    Promise
        .all(promises)
        .then(([user, quizzesDone]) => {
            res.status(200).json({ ...user, quizzesDone })
        })
        .catch(err => next(err))
}

const editUser = (req, res, next) => {

    const { id } = req.params
    const { email, username, avatar, role } = req.body

    User
        .findByIdAndUpdate(id, { email, username, avatar, role }, { new: true })
        .then(user => {
            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
}

const addQuizToUser = (req, res, next) => {

    const { id } = req.params
    const { quizzes } = req.body

    User
        .findByIdAndUpdate(id, { $addToSet: { 'quizzes': quizzes } })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
}

const editPointsUser = (req, res, next) => {

    const { id } = req.params
    const { points } = req.body

    User
        .findByIdAndUpdate(id, { $inc: { 'points': points } })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
}

const resetToken = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            const authToken = user.signToken()
            res.status(200).json({ authToken })
        })
        .catch(err => next(err))
}

module.exports = {
    resetToken,
    deleteUser,
    editPointsUser,
    addQuizToUser,
    editUser,
    getUsersByPoints,
    userById,
    getUserWithQuizzes
}