const Book = require('../Models/book-model')
const mongoose = require('mongoose')

const getBooks = async(req , res) => {
    try {
        const books = await Book.find() ;

        if (books.length === 0) {
            return res.status(400).json({
                success : false ,
                message : 'no books found in database'
            })
        }

        res.status(200).json({
            success : true,
            message : 'Books retrived successfully' ,
            data : books
        })

    } catch(error) {
        return res.status(400).json({
            success : false,
            message : error.message
        })
    }
};

const getBook = async(req , res) => {

    try {
        
        const bookID = req.params.id ;
        if (!mongoose.Types.ObjectId.isValid(bookID)) {
            return res.status(404).json({
                success : false ,
                message : "Invalid book id format"
            })
        }

        const book = await Book.findById(bookID) 

        if (!book) {
            return res.status(404).json({
                success : false , 
                message : 'Book with current ID is not found! Please try with a different ID'
            })
        }

        res.status(200).json({
            success : true ,
            data : book 
        })
    } catch(error) {
        res.status(500).json({
            success : false ,
            message : error.message
        })
    }
};

// #Imporve this control endpoint
const addBook = async(req , res) => {
    try {
        const newBook = req.body 
        const newBookCreation = await Book.create(newBook) 
        if (newBook) {
            return res.status(201).json({
                success: true ,
                message: 'Book added successfully' ,
                data : newBookCreation
            })
        }
    } catch(error) {
        return res.status(400).json({
            success: false ,
            message: error.message
        })
    }
};

const updateBook = async(req , res) => {
    try {

        //Fetching & Validating the book id
        const bookID = req.params.id 
        if (!mongoose.Types.ObjectId.isValid(bookID)) {
            return res.status(404).json({
                success : false ,
                message : "Invalid book id format"
            })
        }

        const book = await Book.findById(bookID)

        if (!book) {
            return res.status(404).json({
                status : false , 
                message : "Book with specific ID is not found!"
            })
        }

        //Fetching updated data
        const {title , author , year} = req.body 

        //Validate updated data
        if (title && (typeof title !== "string" || title.length > 20))  {
            return res.status(400).json({
                success : false ,
                message : "Title violates the rules , must be string and not more that 20 chars"
            })
        }
        
        if (author && ((typeof author !== "string" || title.length > 20))) {
            return res.status(400).json({
                success : false ,
                message : "Author name violates the rules , must be string and not more that 20 chars"
            })
        }   

        if (year && (!Number.isInteger(year) || year < 1000 || year > new Date().getFullYear())) {
            return res.status(400).json({
                success : false ,
                message : "Invalid year , Year must be a number between 1000 and current year"
            })
        }   

        //Update the book data
        if (title)  book.title = title 
        if (author) book.author = author 
        if (year) book.year = year 
        
        await book.save()

        return res.status(200).json({
            status : true ,
            message : "Book is updated" ,
            data : book
        })

    } catch(error) {
        return res.status(500).json({
            status : false ,
            message : error.message
        })
    }
};

const deleteBook = async(req , res) => {
    try {
        
        const bookID = req.params.id 
        if (!mongoose.Types.ObjectId.isValid(bookID)) {
            return res.status(404).json({
                success : false ,
                message : "Invalid book id format"
            })
        }

        const deleteOperation = await Book.findByIdAndDelete(bookID) 

        if (!deleteOperation) {
            return res.status(404).json({
                success : false , 
                message : "Book not found"
            })
        }

        res.status(200).json({
            success : true ,
            message : "Book has been deleted successfully"
        })

    } catch(error) {
        res.status(500).json({
            status : false ,
            message : error.message
        })
    }
};

module.exports = {getBooks , getBook , addBook , updateBook , deleteBook};