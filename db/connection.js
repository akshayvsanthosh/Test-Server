const mongoose = require('mongoose')

const connection_string = process.env.CONNECTION_STRING

mongoose.connect(connection_string).then((res)=>{
    console.log("Mongodb Atlas connected with TServer");
}).catch((err)=>{
    console.log("connection failed");
    console.log(err);
})