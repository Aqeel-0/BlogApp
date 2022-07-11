import express from 'express'
import { getUser, registerUser, login, deleteUser } from '../controller/userController.js'
import { Adminvalidate } from '../validation-joi/token_auth.js'
const userRoute = express.Router()

userRoute.get('/', getUser)
userRoute.delete('/:userId', Adminvalidate, deleteUser)
userRoute.post('/registration', registerUser)
userRoute.post('/login', login)


export default userRoute