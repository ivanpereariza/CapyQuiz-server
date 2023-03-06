const { Schema, model } = require("mongoose")

const quizSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title required']
        },
        theme: {
            type: String,
            required: [true, 'Theme required']
        },
        description: {
            type: String,
        },
        questionsArr: [{
            question: { type: String, required: [true, 'Question required'] },
            correctAnswer: { type: String, required: [true, 'Correct answer required'] },
            answersOptions: { type: [String], required: [true, 'Three Answers options required'] },
            points: { type: [Number], default: [] },
        }],
        points: {
            type: [Number],
            default: []
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        raiting: {
            type: [{
                owner: {
                    ref: 'User',
                    type: Schema.Types.ObjectId
                },
                rate: { type: Number }
            }],
            default: []
        },
        comments: {
            type: [{
                ref: 'Comment',
                type: Schema.Types.ObjectId
            }],
            default: []
        }

    },
    {
        timestamps: true
    }

)
const Quiz = model('Quiz', quizSchema)

module.exports = Quiz