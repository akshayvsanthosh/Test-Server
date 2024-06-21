require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require('./db/connection')

const tServer = express()
tServer.use(cors())
tServer.use(express.json())
tServer.use(router)


const PORT = 3000 || process.env.PORT

tServer.listen(PORT,()=>{
    console.log(`Test server started at port : ${PORT}`);
})

tServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:red;'>Test Server started and waiting for client request!!!</h1>`)
})
