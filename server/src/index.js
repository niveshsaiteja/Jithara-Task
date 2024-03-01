const express = require('express')
const app = express()

const cors = require('cors')
const { PORT } = require('./constants')


app.use(express.json())

app.use(cors())

//import routes 
const studentRoutes = require('./routes/customer')

//initialize routes
app.use('/customer',studentRoutes) 

//app start
const appStart=()=>{
    try{
        app.listen(PORT,()=>{
            console.log(`the app is running at http://localhost:${PORT}`)
        })
    }
    catch(error){
        console.log(`Error : ${error.message}`)
    }
}

appStart()