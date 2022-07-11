import express from 'express'
import { getData, postData, getSpecificData, updatePost, deletePost, likePost, commentPost, deleteComment } from '../controller/postController.js'
import {validate, Adminvalidate} from '../validation-joi/token_auth.js'
const postRoute = express.Router()

postRoute.get('/', getData)
postRoute.get('/post', getSpecificData)
postRoute.post('/',  validate, postData)
postRoute.delete('/:postId', Adminvalidate, deletePost)
postRoute.patch('/edit/:postId', Adminvalidate, updatePost)

// likes handling
postRoute.patch('/:postId', validate, likePost)
//comment
postRoute.patch('/post/:postId', validate, commentPost)
postRoute.delete('/post/:postId/:commId', deleteComment)

    
export default postRoute