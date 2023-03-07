const { verifyToken } = require("../middlewares/auth.middleware")
const Quiz = require("../models/Quiz.model")
const router = require("express").Router()

router.get('/getAllQuizzes', (req, res, next) => {

    Quiz
        .find()
        .populate('owner')
        .then((quizzes) => res.json(quizzes))
        .catch(err => next(err))
})

router.post('/saveQuiz', verifyToken, (req, res, next) => {

    const { title, description, theme, questionsArr } = req.body
    const { _id: owner } = req.payload

    Quiz
        .create({ title, description, theme, owner, questionsArr })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

router.get('/quizById/:id', (req, res, next) => {

    const { id } = req.params

    Quiz
        .findById(id)
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
})

router.put('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { title, theme, description, questionsArr, quizImg } = req.body

    Quiz
        .findByIdAndUpdate(id, { title, theme, description, questionsArr, quizImg })
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
})

router.delete('/delete/:id', (req, res, next) => {

    const { id } = req.params

    Quiz
        .findByIdAndDelete(id)
        .then(quiz => res.status(200).json(quiz))
        .catch(err => next(err))
})

router.get('/search', (req, res, next) => {

    const { title } = req.query

    Quiz
        .find({ title })
        .then(quizzes => res.status(200).json(quizzes))
        .catch(err => next(err))
})

module.exports = router