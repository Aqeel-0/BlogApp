import { userdb } from '../model/database.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


// validation schema
import joi from 'joi'
import {registerationSchema, loginSchema} from '../validation-joi/validation.js'



export const getUser = async (req, res)=>{
    try {
        const data = await userdb.find({})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({'error': error})
    }
}

export const registerUser = async (req, res)=>{
    const data = req.body
    // check if the input information is valid
    
    const {error, valid} = joi.validate(data, registerationSchema)
    if(error) return res.status(400).json({'message': "invalid format", "reason": error.details[0].message})
    

    // check if the use already exists
    const check = await userdb.findOne({email: data.email})
    if(check) return res.status(400).json({'message': "invalid format", "reason": 'user already exists try logging in' })

    //hasing password

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(data.password, salt)
    data.password = hashpassword
    
    try {
        const newuser = await new userdb(data)
        await newuser.save()
        res.status(201).json(data)
        
    } catch (error) {
        res.status(403).end(error)
    }
}

export const login = async(req, res)=>{
    const data = req.body
    // check if the input information is valid
    
    const {error, valid} = joi.validate(data, loginSchema)
    if(error) return res.status(400).json({'message': "invalid format", "reason": error.details[0].message})
    // check if the use already exists
    const info = await userdb.findOne({email: data.email})
    if(!info) return res.status(400).json({'reason':'user doest exists'})

    const match = await bcrypt.compare(data.password, info.password)
    if(!match) return res.status(400).json({'reason':'incorrect password'})
    

    const token = jsonwebtoken.sign({_id: info._id, name: info.name}, process.env.WEB_TOKEN)
    res.cookie('jwt', token, { sameSite: 'none', secure: true}) 
    if(info.name === 'Admin') return res.status(200).json({'message': 'logged in successfully', 'user': 'Admin'})
    res.status(200).json({'message': 'logged in successfully', 'user': 'User'})
   

}

export const deleteUser = async (req, res)=>{
    const id = req.params.userId
    try {
        const result = await userdb.findByIdAndDelete(id)
        res.status(202).json({'result': 'user deleted', user: result})
    } catch (error) {
        res.status(400).json({'err': 'failed to delete user'})
    }
}