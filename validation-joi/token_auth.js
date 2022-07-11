
import jsonwebtoken from 'jsonwebtoken'
import { userdb } from '../model/database.js'

export const validate = (req, res, next)=>{
    const token = req.header('auto-token')
    if(!token) return res.status(401).json({'err' : 'Not logged in'})
    try {
        const verified = jsonwebtoken.verify(token, process.env.WEB_TOKEN) // this returns value of which we set the token to
    } catch (error) {
        return res.status(401).json({'err' : 'Not logged in'})
    }
    next()
}

export const Adminvalidate = async (req, res, next)=>{
    const token = req.header('auto-token')
    if(!token) return res.status(401).json({'err' : 'Not logged in'})
    try {
        const {_id} = jsonwebtoken.verify(token, process.env.WEB_TOKEN) // this returns value of which we set the token to
        const result = await userdb.findById(_id)
        if(result.name !== 'Admin') return res.status(401).json({'err' : 'Only admin has access'})
    } catch (error) {
        return res.status(401).json({'err' : 'Not logged in as admin'})
    }
    next()
}
