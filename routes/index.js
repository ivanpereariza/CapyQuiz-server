const router = require("express").Router()

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const quizRoutes = require("./quiz.routes")
router.use("/quiz", quizRoutes)

module.exports = router