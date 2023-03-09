const router = require("express").Router()

const uploader = require('./../middlewares/cloudinary.middleware')

router.post('/image', uploader.single('imageData'), (req, res) => {

    if (!req.file) {
        return res.sendStatus(200)
    } else res.json({ cloudinary_url: req.file.path })
})


module.exports = router
