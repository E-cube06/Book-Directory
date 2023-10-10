const express = require('express')
const bodyParser= require('body-parser')
const api = require('./src/api') 
const app = express()
const port= 3000;


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/api/v1', api)


app.listen(port, ()=>console.log(`Server running on port ${port}`))