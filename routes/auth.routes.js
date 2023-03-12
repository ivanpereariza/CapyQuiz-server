const router = require("express").Router()
const { verifyToken } = require("../middlewares/auth.middleware")
const {
    signup,
    login,
    verify
} = require('./../controllers/auth.controller')

router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', verify)

module.exports = router