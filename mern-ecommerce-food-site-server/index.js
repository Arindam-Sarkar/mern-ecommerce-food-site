import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import { dbConnect } from './utils/dbConnect.js'
import userRouter from './routes/userRoute.js'
import { createErrorMsg, sendErrorResponse } from './utils/errorResponse.js'


const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())

app.use(cors())
app.options('*', cors())

app.use("/api/user/", userRouter)

app.use(sendErrorResponse)

app.listen((8800), () => {
  dbConnect()
  console.log('listening on port 8800');
})