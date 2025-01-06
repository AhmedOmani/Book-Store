const express = require('express')
const controller = require('../Controllers/book-controller')
//create express router 
const router = express.Router()

//all the routes thar are related to books only
router.get('/getBooks' , controller.getBooks);
router.get('/getBook/:id', controller.getBook);
router.post('/addBook', controller.addBook) ;
router.put('/updateBook/:id', controller.updateBook);
router.delete('/deleteBook/:id', controller.deleteBook);

module.exports = router