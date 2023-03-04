const Quiz = require("../models/Quiz.model")
const router = require("express").Router()

router.post('/saveQuiz', (req, res, next) => {
    const { title, description, theme, owner, questionsArr } = req.body

    Quiz
        .create({ title, description, theme, owner, questionsArr })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})

module.exports = router