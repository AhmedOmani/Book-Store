require("dotenv").config()
const express = require("express")
const connection = require("./Database/db")
const bookRoutes = require('./Routes/book-routes')

const app = express()
const PORT = process.env.PORT 

//connect to our database
connection() ;

//middleware 
app.use(express.json())

//routes
app.use('/api/books' , bookRoutes)

app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})