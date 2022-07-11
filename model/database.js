import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image: {type: String, default: ''},
    date: {type: Date, default: Date.now()},

})

const blogschema = new mongoose.Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    body: {type: String, required: true},
    likes: {type: Object, default: {}},
    likes_count: {type: Number, default: 0},
    comment: {type: Object, default: []},
})

const userdb = mongoose.model('userDb', userschema)
const blogdb = mongoose.model('blogDb', blogschema)
export {userdb, blogdb}