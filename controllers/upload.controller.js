const uploadImage = (req, res, next) => {

    if (!req.file) {
        return res.sendStatus(200)
    } else res.json({ cloudinary_url: req.file.path })
}

module.exports = uploadImage