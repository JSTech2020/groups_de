var Story = require('../models/story.model')
var S3 = require('../services/s3')

const singleUpload = S3.multerS3.single('authorImage');
const MIN_CHARACTERS_PAGE = 1500;

exports.getStories = function (_req, res) {
    Story.find()
        .select('title author shortDescription numberLikes categories')
        .then(stories => { res.json(stories) })
        .catch(error => res.status(500).json({ error: error.message }))
};

exports.getStory = function (req, res) {
    Story.findById(req.params.id)
        .then(story => res.json(story))
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.deleteStory = function (req, res) {
    Story.findByIdAndDelete({ _id: req.params.id })
        .then(deletedStory => {
            if (!!deletedStory.authorImage) {
                S3.deleteElements([deletedStory.authorImage], process.env.S3_BUCKET_NAME)
            }
            res.json('story with id ' + deletedStory._id + ' was deleted successfully')
        })
        .catch(error => res.status(500).json({ error: error.message }))
}

exports.createStory = function (req, res) {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ err: err.message })
        }

        let authorImage = !!req.file ? req.file.key : ""
        let convertedStoryPages = convertStoryToPages(req.body.storyPages, MIN_CHARACTERS_PAGE)
        let story = new Story({
            title: req.body.title,
            author: req.body.author,
            authorImage: authorImage,
            shortDescription: req.body.shortDescription,
            categories: req.body.categories,
            storyPages: convertedStoryPages
        })
        story.save()
            .then(story => { res.json('story: ' + story.title + ' was created successfully') })
            .catch(error => res.status(500).json({ error: error.message }))
    });
};

exports.updateStory = function (req, res) {
    Story.updateOne({ _id: req.body._id }, req.body, { new: true })
        .then(story => { res.json('story: ' + story.title + ' was updated successfully') })
        .catch(error => res.status(500).json({ error: error.message }))
}

function convertStoryToPages(text, minCharactersPage) {
    text = text.replace(/<div>|<\/div>|<strong>|<\/strong>|<em>|<\/em>| &nbsp;|&nbsp;/g, "")
        .replace(/<br>/g, "\n")
    let storyPages = []
    let start = 0
    let end = 0

    while (end !== -1) {
        if (end === 0) {
            end = text.indexOf("\n", minCharactersPage);
        }
        page = text.slice(start, end);
        storyPages.push(page)

        start = end + 2;
        end = text.indexOf("\n", minCharactersPage * (storyPages.length + 1));
    }

    start = text.indexOf("\n", minCharactersPage * storyPages.length) + 2;
    end = text.lastIndexOf(".")
    if (start < end) {
        page = text.slice(start, end);
        storyPages.push(page)
    }
    return storyPages
}
