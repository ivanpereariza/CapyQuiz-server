const Comment = require('./../models/Comment.model')
const Quiz = require("../models/Quiz.model")



const createComment = (req, res, next) => {

    const { comment } = req.body
    const { quizId } = req.params

    Comment
        .create(comment)
        .then((comment) => Quiz.findByIdAndUpdate(quizId, { $push: { comments: { $each: [comment._id], $position: 0 } } }, { new: true }))
        .then((data) => res.status(201).json(data))
        .catch(err => next(err))

}



module.exports = createComment
