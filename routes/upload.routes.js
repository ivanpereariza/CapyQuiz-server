const router = require("express").Router()
const uploader = require('./../middlewares/cloudinary.middleware')
const uploadImage = require('./../controllers/upload.controller')

router.post('/image', uploader.single('imageData'), uploadImage)

module.exports = router
