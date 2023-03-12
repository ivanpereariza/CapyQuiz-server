const { verifyToken } = require("../middlewares/auth.middleware")
const router = require("express").Router()
const {
    searchQuiz,
    deleteQuiz,
    addPointsToQuiz,
    editQuiz,
    quizByOwner,
    quizById,
    saveQuiz,
    getAllQuizzes
} = require('./../controllers/quiz.controller')

router.get('/getAllQuizzes', getAllQuizzes)
router.post('/saveQuiz', verifyToken, saveQuiz)
router.get('/quizById/:id', quizById)
router.get('/quizByOwner/:id', quizByOwner)
router.put('/edit/:id', editQuiz)
router.put('/addPoints/:id', addPointsToQuiz)
router.delete('/delete/:id', deleteQuiz)
router.get('/search', searchQuiz)

module.exports = router