import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.json())

const corsOptions ={
    origin:['http://localhost:3000', 'http://10.25.42.169'], 
    credentials:true,
}

app.use(cors(corsOptions));

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     next();
//   });



const connect = async()=>{
    try {
        mongoose.connect(process.env.MONGO_LINK)
        .then(res => console.log('connect'))
        .catch(err => console.log('connection to db failed'))
        app.listen(process.env.PORT, ()=>{
            console.log('server up and running at port '+ process.env.PORT)
        })
    } catch (error) {
        console.log(error)
    }
}
connect()


import user_router from './routes/userRoute.js'
import post_router from './routes/postRoute.js'

app.use('/user', user_router)
app.use('/', post_router)
