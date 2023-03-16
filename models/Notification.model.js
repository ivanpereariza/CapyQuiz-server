const { Schema, model } = require("mongoose")

const notificationSchema = new Schema(
    {
        ownerQuiz: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        quiz: {
            ref: 'Quiz',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true
    }
)

const Notification = model('Notification', notificationSchema)

module.exports = Notification