exports.uploadMedia = function (req, res) {
    res.json({ 'uploaded_media': req.files.map(file => { console.log(file); return file.key }) })
}
