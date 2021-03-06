// Dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
// PORT
const PORT = process.env.PORT || 3333
// Database
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)
// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// middleware
// use the public folder
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))



const songsControllers = require('./controllers/songs.js');
app.use('/', songsControllers)

// ** CONNECTION ** //
mongoose.connect(MONGODB_URI , ///port 27017 for the database
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
  },
    () => {
      console.log('The connection with mongod is established')
})


app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
})
