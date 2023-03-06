const router = require("express").Router()
const User = require("../models/User.model")

router.get('/userById/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .select({ avatar: 1, username: 1, points: 1, role: 1 })
        .then(user => res.status(200).json(user))
        .catch(err => next(err).json({ message: "User dont exist" }))
})

router.put('/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { email, username, avatar } = req.body

    User
        .findByIdAndUpdate(id, { email, username, avatar })
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

router.delete('/delete/:id', (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(user => res.status(200).json(user))
        .catch(err => next(err))
})

module.exports = router