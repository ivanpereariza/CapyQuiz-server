const { Schema, model } = require("mongoose")

const quizSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title required']
        },
        theme: {
            type: String,
            requierd: [true, 'Theme required']
        },
        questionsArr: [{
            question: { type: String, required: [true, 'Question required'] },
            correctAnswer: { type: String, required: [true, 'Correct answer required'] },
            answersOptions: { type: [String], required: [true, 'Three Answers options required'] }
        }],
        points: [Number],
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        raiting: [{
            owner: {
                ref: 'User',
                type: Schema.Types.ObjectId
            },
            rate: { type: Number }
        }],
        comments: [{
            ref: 'Comment',
            type: Schema.Types.ObjectId
        }]

    },
    {
        timestamps: true
    }

)
const Quiz = model('Quiz', quizSchema)

module.exports = Quiz