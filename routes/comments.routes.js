const router = require("express").Router()
const { verifyToken } = require("../middlewares/auth.middleware")

const createComment = require('./../controllers/comments.controllers')


router.post('/create/:quizId', verifyToken, createComment)

module.exports = router
