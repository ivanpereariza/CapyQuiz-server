const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            minlength: 10,
        }

    },
    {
        timestamps: true
    }
)

const Comment = model('Comment', commentSchema)

module.exports = Comment