const router = require("express").Router()
const User = require("../models/User.model")

router.get('/userById/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .select({ avatar: 1, username: 1, points: 1, role: 1 })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ message: "User dont exist" }))
})

module.exports = router