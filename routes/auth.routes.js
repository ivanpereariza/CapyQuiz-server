const router = require("express").Router()
const { verifyToken } = require("../middlewares/auth.middleware")
const {
    signup,
    login,
    verify
} = require('./../controllers/auth.controller')

router.get('/verify', verifyToken, verify)
router.post('/signup', signup)
router.post('/login', login)

module.exports = router