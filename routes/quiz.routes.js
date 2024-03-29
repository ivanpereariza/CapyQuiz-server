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
    getAllQuizzes,
    getPopularQuizzes,
    ownerOfQuiz,
    quizComments,
    getDailyQuiz,
} = require('./../controllers/quiz.controller')

router.get('/getAllQuizzes', getAllQuizzes)
router.get('/getPopularQuizzes', getPopularQuizzes)
router.get('/quizById/:id', quizById)
router.get('/quizByOwner/:id', quizByOwner)
router.get('/ownerOfQuiz/:id', ownerOfQuiz)
router.get('/search', searchQuiz)
router.get('/quizComments/:id', quizComments)
router.get('/getDailyQuiz', getDailyQuiz)
router.post('/saveQuiz', verifyToken, saveQuiz)
router.put('/edit/:id', editQuiz)
router.put('/addPoints/:id', addPointsToQuiz)
router.delete('/delete/:id', deleteQuiz)

module.exports = router