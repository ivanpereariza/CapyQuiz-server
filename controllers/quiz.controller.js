const Quiz = require("../models/Quiz.model")




const getAllQuizzes = (req, res, next) => {
    Quiz
        .find()
        .populate('owner')
        .then((quizzes) => res.json(quizzes))
        .catch(err => next(err))
}

const saveQuiz = (req, res, next) => {
    const { title, description, theme, questionsArr, quizImg } = req.body
    const { _id: owner } = req.payload

    Quiz
        .create({ title, description, theme, owner, questionsArr, quizImg })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const quizById = (req, res, next) => {

    const { id } = req.params

    Quiz
        .findById(id)
        .populate('owner')
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
}

const quizByOwner = (req, res, next) => {

    const { id } = req.params

    Quiz
        .find({ owner: id })
        .populate('owner')
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
}

const editQuiz = (req, res, next) => {

    const { id } = req.params
    const { title, theme, description, questionsArr, quizImg, rating } = req.body

    Quiz
        .findByIdAndUpdate(id, { title, theme, description, questionsArr, quizImg, rating }, { new: true })
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
}

const addPointsToQuiz = (req, res, next) => {

    const { id } = req.params
    const { points } = req.body

    Quiz
        .findByIdAndUpdate(id, { $push: { 'points': points } }, { new: true })
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
}

const deleteQuiz = (req, res, next) => {

    const { id } = req.params

    Quiz
        .findByIdAndDelete(id)
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
}

const searchQuiz = (req, res, next) => {

    const { title } = req.query

    Quiz
        .find({ title })
        .then(quizzes => res.status(200).json(quizzes))
        .catch(err => next(err))
}


module.exports = {
    searchQuiz,
    deleteQuiz,
    addPointsToQuiz,
    editQuiz,
    quizByOwner,
    quizById,
    saveQuiz,
    getAllQuizzes
}