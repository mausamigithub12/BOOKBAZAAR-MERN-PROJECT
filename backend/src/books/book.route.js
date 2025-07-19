// const express = require('express')
// const router =  express.Router();
// const Book = require('./book.model');
// const { postABook, getAllBooks, getSingleBook, updatedBook, deleteABook} = require('./book.controller');
// const verifyAdminToken = require('../middleware/verifyAdminToken');



// router.post("/create-book",verifyAdminToken,postABook)

// //get all books 
// router.get("/", getAllBooks)

// // single book endpoint
// router.get("/:id", getSingleBook);

// // update a book endpoint
// router.put("/edit/:id",  updatedBook);
  
// router.delete("/:id", deleteABook)


// module.exports = router;

// //post = when submit something fronted to db
// // get =  when get something back from db
// // put/patch = when edit or update something
// // delete = when delete something
const express = require('express');
const router = express.Router();
const {
    postABook,
    getAllBooks,
    getSingleBook,
    updatedBook,
    deleteABook
} = require('./book.controller');

// const verifyAdminToken = require('../middleware/verifyAdminToken');

router.post("/create-book",  postABook); // 🔒 protected

router.get("/", getAllBooks); // public
router.get("/:id",  getSingleBook);
router.put("/edit/:id",  updatedBook);
router.delete("/:id",  deleteABook);

module.exports = router;
