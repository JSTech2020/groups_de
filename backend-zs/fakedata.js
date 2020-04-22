
var faker = require('faker');
var mongoose = require('mongoose');
const RandExp = require('randexp');

var createFakeData = function createFakeData() {
    //We first create a few fake users
    let UserModel = require('./models/user.model')
    for (let i = 0; i < 100; i += 1) {
        let newUser = new UserModel({
            email: faker.internet.email(),
            password: faker.internet.password(),
            verificationToken: faker.random.alphaNumeric(),
            isAuthenticated: faker.random.boolean(),
            registrationComplete: faker.random.boolean(),
            firstname: faker.name.findName(),
            city: faker.address.city(),
            country: faker.address.country(),
            //TODO actual avatar
            avatar: mongoose.Types.ObjectId(),
            parentPin: new RandExp(/[0-9]\w{4,4}/).gen(),
            admin: faker.random.boolean(),
            //TODO should point to actual posts
            likes: [],
            username: faker.name.findName(),
        })
        newUser.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })
    }

    //Now lets create some posts!
    let FeedModel = require('./models/feed.model')
    for (let i = 0; i < 100; i += 1) {
        let newPost = new FeedModel({
            user: mongoose.Types.ObjectId(),
            title: faker.lorem.words(),
            content: faker.lorem.text(),
            //TODO actual media, once we define hwo its supposed to look like
            media: [],

            numberLikes: [],
            comments: [],
        })
        newPost.save()
            .then(doc => {
                console.log(doc)
            })
            .catch(err => {
                console.error(err)
            })

    }
}
module.exports.createFakeData = createFakeData;