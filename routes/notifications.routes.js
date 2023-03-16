const router = require("express").Router();

const {
    getNotificationsByOwnerId,
    createNotification,
    deletenotification,
} = require('./../controllers/notifications.controllers')


router.get('/getNotifications/:id', getNotificationsByOwnerId)
router.post('/create', createNotification)
router.delete('/delete/:id', deletenotification)

module.exports = router;
