const Quiz = require("../models/Quiz.model")
const router = require("express").Router()

router.get('/', (req, res, next) => {

    Quiz
        .find()
        .populate('owner')
        .then((quizzes) => res.json(quizzes))
        .catch(err => next(err))
})

router.post('/saveQuiz', (req, res, next) => {
    const { title, description, theme, owner, questionsArr } = req.body

    Quiz
        .create({ title, description, theme, owner, questionsArr })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})



module.exports = router