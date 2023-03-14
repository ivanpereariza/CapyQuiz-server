const router = require("express").Router()
const {
    resetToken,
    deleteUser,
    editPointsUser,
    addQuizToUser,
    editUser,
    getUsersByPoints,
    userById,
    getUserWithQuizzes
} = require('./../controllers/users.controller')

router.get('/userById/:id', userById)
router.get('/getUsersByPoints', getUsersByPoints)
router.get('/userWithQuizzes/:id', getUserWithQuizzes)
router.get('/resetToken/:id', resetToken)
router.put('/edit/:id', editUser)
router.put('/addQuiz/:id', addQuizToUser)
router.put('/editPoints/:id', editPointsUser)
router.delete('/delete/:id', deleteUser)



module.exports = router