const Notification = require('./../models/Notification.model')

const getNotificationsByOwnerId = (req, res, next) => {

    const { id } = req.params

    Notification
        .find({ ownerQuiz: id })
        .populate('quiz', 'theme')
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
}

const createNotification = (req, res, next) => {

    const { quizId, ownerId } = req.body

    Notification
        .create({ quiz: quizId, ownerQuiz: ownerId })
        .then((data) => res.status(201).json(data))
        .catch(err => next(err))
}

const deletenotification = (req, res, next) => {

    const { id } = req.params

    Notification
        .findByIdAndDelete(id)
        .then((data) => res.status(200).json(data))
        .catch(err => next(err))
}

module.exports = {
    getNotificationsByOwnerId,
    createNotification,
    deletenotification
}
