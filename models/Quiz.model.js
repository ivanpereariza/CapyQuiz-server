const { Schema, model } = require("mongoose")

const quizSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title required'],
            minlength: [5, 'The title shold have minimun 5 characters'],
            maxlength: [80, 'The title shold have maximun 80 characters'],
        },
        theme: {
            type: String,
            required: [true, 'Theme required'],
            maxlength: [20, 'The theme shold have maximun 20 characters'],
        },
        quizImg: {
            type: String,
            default: 'https://res.cloudinary.com/dkfzj9tmk/image/upload/v1678125910/CapyQuiz/quiz-logo-with-speech-bubble-icon_149152-811_rakyxp.png'
        },
        description: {
            type: String,
            maxlength: [200, 'The description shold have maximun 200 characters'],
        },
        questionsArr: {
            type: [{
                question: {
                    type: String,
                    required: [true, 'Question required'],
                    minlength: [5, 'The question shold have minimun 5 characters'],
                    maxlength: [150, 'The question shold have maximun 150 characters'],
                },
                correctAnswer: {
                    type: String,
                    required: [true, 'Correct answer required'],
                },
                answersOptions: {
                    type: [String],
                    required: [true, 'Three Answers options required']
                },
                points: { type: [Number], default: [] }
            }],
            validate: {
                validator: function (arr) {
                    return arr.length >= 5;
                },
                message: 'Should have at least 5 questions'
            }
        },
        points: {
            type: [Number],
            default: []
        },
        owner: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        rating: {
            type: [{
                owner: {
                    ref: 'User',
                    type: Schema.Types.ObjectId
                },
                rate: { type: Number }
            }],
            default: []
        },
        ratingAvg: {
            type: Number,
            default: 0
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