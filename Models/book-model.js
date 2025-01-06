const mongoos = require('mongoose')

const BookSchema = new mongoos.Schema({
    title : {
        type : String , 
        required : [true , 'Book title is required'],
        trim : true,
        maxLength : [20 , 'Book title can not be more than 20 characters']
    },
    author : {
        type : String ,
        required : [true , 'Authoe name is mandatory'] ,
        trim : true 
    },
    year : {
        type : Number ,
        required : [true , "Publication year is required"],
        min : [1000] ,
        max : [new Date().getFullYear() , "Year cannot be in the future"]
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoos.model("Book" , BookSchema)