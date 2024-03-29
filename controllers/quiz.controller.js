const Quiz = require("../models/Quiz.model")
const cron = require("node-cron")
const scheduleTime = '0 0 6 * * *'
let lastQuizId = '640afee20183360d24ad2a52'
let quiz

cron.schedule(scheduleTime, async () => {
    quiz = await selectRandomQuiz()
    while (lastQuizId === quiz._id.toString()) {
        quiz = await selectRandomQuiz()
    }
    lastQuizId = quiz._id.toString()
})


const selectRandomQuiz = () => {

    return Quiz
        .aggregate([{ $sample: { size: 1 } }])
        .then((randomQuiz) => randomQuiz[0])
        .catch(err => console.log(err))

}

const getAllQuizzes = (req, res, next) => {
    Quiz
        .find()
        .sort({ createdAt: -1 })
        .populate('owner')
        .then((quizzes) => res.json(quizzes))
        .catch(err => next(err))
}

const getPopularQuizzes = (req, res, next) => {
    Quiz
        .find()
        .sort({ ratingAvg: -1 })
        .limit(3)
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

const ownerOfQuiz = (req, res, next) => {

    const { id } = req.params

    Quiz
        .findById(id)
        .populate('owner')
        .then(quiz => res.status(200).json(quiz.owner))
        .catch(err => next(err))
}

const editQuiz = (req, res, next) => {

    const { id } = req.params
    const { title, theme, description, questionsArr, quizImg, rating, ratingAvg } = req.body

    Quiz
        .findByIdAndUpdate(id, { title, theme, description, questionsArr, quizImg, rating, ratingAvg }, { new: true })
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

    const { search, ratingMin, ratingMax } = req.query

    Quiz
        .find({
            $and: [{
                $or: [{ 'title': { '$regex': search, '$options': 'i' } },
                { 'theme': { '$regex': search, '$options': 'i' } }]
            },
            {
                $and: [{ ratingAvg: { $gte: ratingMin } },
                { ratingAvg: { $lte: ratingMax } }]
            }]
        })
        .populate('owner')
        .then((data) => res.json(data))
        .catch(err => console.log(err))
}

const quizComments = (req, res, next) => {

    const { id } = req.params

    Quiz
        .findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'owner'
            }
        })
        .select({ comments: 1 })
        .then((comments) => res.json(comments))
        .catch(err => next(err))
}

const getDailyQuiz = (req, res, next) => {

    Quiz
        .findById(lastQuizId)
        .then((quiz) => res.json(quiz))
        .catch(err => next(err))
}


module.exports = {
    searchQuiz,
    deleteQuiz,
    addPointsToQuiz,
    editQuiz,
    quizByOwner,
    ownerOfQuiz,
    quizById,
    saveQuiz,
    getAllQuizzes,
    quizComments,
    getDailyQuiz,
    getPopularQuizzes
}