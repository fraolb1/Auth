import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js'
import { errorHandler,notFound } from './middlewares/errorMidleware.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


dotenv.config()
const PORT = 5000

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)


connectDB();
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))