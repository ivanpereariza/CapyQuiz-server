const router = require("express").Router()
const { verifyToken } = require("../middlewares/auth.middleware")

const {
    createComment,
    editComment,
    deleteComment,
} = require('./../controllers/comments.controllers')

router.post('/create/:quizId', verifyToken, createComment)
router.put('/edit/:id', editComment)
router.delete('/delete/:id', deleteComment)

module.exports = router
