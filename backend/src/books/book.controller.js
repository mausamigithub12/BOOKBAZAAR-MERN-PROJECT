// const Book = require("./book.model");

// const postABook = async (req, res) => {
//       try {
//         const newBook = await Book ({...req.body});
//         await newBook.save();
//         res.status(200).send({message:"Book Posted Successfully", book: newBook})
//       } catch (error) {
//         console.error("Error created book", error);
//         res.status(500).send({message:"Failed to create book"})

//       }

// }

// // get all books
// const getAllBooks = async (req, res) => {
//     try {
//         const books = await Book.find().sort({createdAt: -1});
//         res.status(200).send({books})
//     } catch (error) {
//          console.error("Error fetching  books", error);
//         res.status(500).send({message:"Failed to fetch books"})
        
//     }
// }

// //get a single book
// const getSingleBook = async (req, res) => {
//     try {
//          const {id} = req.params;
//         const book = await Book.findById(id);
//         if(!book){
//            res.status(404).send({message: "Book not Found!"})

//         }
//         res.status(200).send({book})

        
//     } catch (error) {
//          console.error("Error fetching  book", error);
//         res.status(500).send({message:"Failed to fetch book"})
        
//     }
// }

// // update book data
// const updatedBook = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const updatedBook =  await Book.findByIdAndUpdate(id, req.body, {new: true});
//         if(!updatedBook) {
//             res.status(404).send({message: "Book is not Found!"})
//         }
//         res.status(200).send({
//             message: "Book updated successfully",
//             book: updatedBook
//         })
//     } catch (error) {
//         console.error("Error updating a book", error);
//         res.status(500).send({message: "Failed to update a book"})
//     }
// }



// //delete book data
// const deleteABook = async (req, res) => {
//     try {
//         const {id} = req.params;
//         const deletedBook =  await Book.findByIdAndDelete(id);
//         if(!deletedBook) {
//             res.status(404).send({message: "Book is not Found!"})
//         }
//         res.status(200).send({
//             message: "Book deleted successfully",
//             book: deletedBook
//         })
//     } catch (error) {
//         console.error("Error deleting a book", error);
//         res.status(500).send({message: "Failed to delete a book"})
//     }
// }




// // ... (keep your existing controller methods)

// // Add review to a book
// const addReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId, userName, rating, comment } = req.body;

//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(404).send({ message: "Book not found!" });
//     }

//     const newReview = {
//       userId,
//       userName,
//       rating,
//       comment
//     };

//     book.reviews.push(newReview);
//     await book.save();

//     res.status(201).send({ message: "Review added successfully", book });
//   } catch (error) {
//     console.error("Error adding review:", error);
//     res.status(500).send({ message: "Failed to add review" });
//   }
// };







// const likeBook = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { userId } = req.body;

//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(404).send({ message: "Book not found!" });
//     }

//     // Check if user already liked the book
//     const likeIndex = book.likes.findIndex(like => like.userId === userId);
//     let liked = false;

//     if (likeIndex === -1) {
//       // Add like
//       book.likes.push({ userId });
//       liked = true;
//     } else {
//       // Remove like
//       book.likes.splice(likeIndex, 1);
//     }

//     await book.save();

//     res.status(200).send({
//       message: liked ? "Book liked successfully" : "Like removed successfully",
//       book,
//       liked
//     });
//   } catch (error) {
//     console.error("Error liking book:", error);
//     res.status(500).send({ message: "Failed to like book" });
//   }
// };


// // Track view count
// const trackBookView = async (req, res) => {
//   try {
//     const bookId = req.params.id;

//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     book.views = (book.views || 0) + 1;
//     await book.save();

//     res.status(200).json({ message: "View tracked", views: book.views });
//   } catch (error) {
//     console.error("View tracking error:", error);
//     res.status(500).json({ message: "Failed to track view" });
//   }
// };







// // Track book view
// // const trackBookView = async (req, res) => {
// //   try {
// //     const { id } = req.params;
    
// //         if (!mongoose.Types.ObjectId.isValid(id)) {
// //       return res.status(400).json({ message: "Invalid book ID" });
// //     }



// //     const book = await Book.findByIdAndUpdate(
// //       id,
// //       { $inc: { viewCount: 1 } },
// //       { new: true }
// //     );

// //     if (!book) {
// //       return res.status(404).send({ message: "Book not found!" });
// //     }

// //     res.status(200).send({ message: "View tracked successfully", book });
// //   } catch (error) {
// //     console.error("Error tracking book view:", error);
// //     res.status(500).send({ message: "Failed to track book view" });
// //   }
// // };

// // Get recommended books (content-based filtering)
// // const getRecommendedBooks = async (req, res) => {
// //   try {
// //     const { category } = req.query;
// //     const { id } = req.params; // current book ID to exclude
    
// //     if (!category) {
// //       return res.status(400).send({ message: "Category is required" });
// //     }

// //     const recommendedBooks = await Book.find({
// //       category: { $regex: new RegExp(category, 'i') },
// //       _id: { $ne: id } // Exclude current book
// //     })
// //     .sort({ 
// //       viewCount: -1, 
// //       'likes.length': -1, 
// //       'reviews.rating': -1 
// //     })
// //     .limit(5);

// //     res.status(200).send({ recommendedBooks });
// //   } catch (error) {
// //     console.error("Error fetching recommended books:", error);
// //     res.status(500).send({ message: "Failed to fetch recommendations" });
// //   }
// // };


// // const Book = require("./book.model");

// // Content-Based Recommendation
// const getRecommendedBooks = async (req, res) => {
//   try {
//     const bookId = req.params.id;

//     // Fetch the selected book
//     const selectedBook = await Book.findById(bookId);
//     if (!selectedBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // Find books with similar category or author (excluding the selected book)
//     const recommendedBooks = await Book.find({
//       _id: { $ne: bookId },
//       $or: [
//         { category: selectedBook.category },
//         { author: selectedBook.author },
//       ],
//     }).limit(5); // return top 5

//     res.status(200).json({ recommended: recommendedBooks });
//   } catch (error) {
//     console.error("Recommendation error:", error);
//     res.status(500).json({ message: "Error fetching recommendations" });
//   }
// };







// // const getRecommendedBooks = async (req, res) => {
// //   try {
// //     const { bookId } = req.params;
// //     const { category } = req.query;

// //     // Validate inputs
// //     if (!bookId || !category) {
// //       return res.status(400).json({ message: 'Missing book ID or category' });
// //     }

// //     // Get current book details
// //     const currentBook = await Book.findById(bookId);
// //     if (!currentBook) {
// //       return res.status(404).json({ message: 'Book not found' });
// //     }

// //     // Build recommendation query - avoid sorting by multiple array fields
// //     const recommendedBooks = await Book.aggregate([
// //       {
// //         $match: {
// //           _id: { $ne: new mongoose.Types.ObjectId(bookId) },
// //           category: category
// //         }
// //       },
// //       {
// //         $project: {
// //           title: 1,
// //           author: 1,
// //           coverImage: 1,
// //           price: 1,
// //           rating: 1,
// //           // Add other fields you need
// //           similarityScore: {
// //             $add: [
// //               { $cond: [{ $eq: ["$category", category] }, 10, 0] },
// //               // Add other scoring criteria here
// //             ]
// //           }
// //         }
// //       },
// //       { $sort: { similarityScore: -1 } }, // Sort by single computed field
// //       { $limit: 10 }
// //     ]);

// //     res.json({ recommendedBooks });
// //   } catch (error) {
// //     console.error('Recommendation error:', error);
// //     res.status(500).json({ 
// //       message: 'Failed to get recommendations',
// //       error: error.message
// //     });
// //   }
// // };





// module.exports = {
//   postABook,
//   getAllBooks,
//   getSingleBook,
//   updatedBook,
//   deleteABook,
//   addReview,
//   likeBook,
//   trackBookView,
//   getRecommendedBooks
// };





const Book = require("./book.model");

// Helper function to get user preferences from localStorage
const getUserPreferences = () => {
  const userId = localStorage.getItem('uid');
  const interactions = JSON.parse(localStorage.getItem('userInteractions') || '{}');
  
  if (!interactions[userId]) {
    return { likedCategories: [] };
  }
  
  const likedCategories = Object.entries(interactions[userId])
    .filter(([_, data]) => data.likes > 0)
    .map(([bookId, _]) => bookId);
    
  return { likedCategories };
};

// Get recommended books based on user likes
const getRecommendedBooks = async (req, res) => {
  try {
    const { category } = req.query;
    const { id } = req.params; // current book ID to exclude
    
    if (!category) {
      return res.status(400).send({ message: "Category is required" });
    }

    const recommendedBooks = await Book.find({
      category: { $regex: new RegExp(category, 'i') },
      _id: { $ne: id } // Exclude current book
    })
    .sort({ 
      'likes.length': -1, // Sort by most liked first
      createdAt: -1 // Then by newest
    })
    .limit(5);

    res.status(200).send({ recommendedBooks });
  } catch (error) {
    console.error("Error fetching recommended books:", error);
    res.status(500).send({ message: "Failed to fetch recommendations" });
  }
};

// Like a book
const likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    // Check if user already liked the book
    const likeIndex = book.likes.findIndex(like => like.userId === userId);
    let liked = false;

    if (likeIndex === -1) {
      // Add like
      book.likes.push({ userId });
      liked = true;
    } else {
      // Remove like
      book.likes.splice(likeIndex, 1);
    }

    await book.save();

    res.status(200).send({
      message: liked ? "Book liked successfully" : "Like removed successfully",
      book,
      liked
    });
  } catch (error) {
    console.error("Error liking book:", error);
    res.status(500).send({ message: "Failed to like book" });
  }
};

// Other controller methods remain the same...
const postABook = async (req, res) => {
  try {
    const newBook = await Book({...req.body});
    await newBook.save();
    res.status(200).send({message:"Book Posted Successfully", book: newBook})
  } catch (error) {
    console.error("Error created book", error);
    res.status(500).send({message:"Failed to create book"})
  }
}

// get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1});
    res.status(200).send({books})
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({message:"Failed to fetch books"})
  }
}

//get a single book
const getSingleBook = async (req, res) => {
  try {
    const {id} = req.params;
    const book = await Book.findById(id);
    if(!book){
      res.status(404).send({message: "Book not Found!"})
    }
    res.status(200).send({book})
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({message:"Failed to fetch book"})
  }
}

// update book data
const updatedBook = async (req, res) => {
  try {
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedBook) {
      res.status(404).send({message: "Book is not Found!"})
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook
    })
  } catch (error) {
    console.error("Error updating a book", error);
    res.status(500).send({message: "Failed to update a book"})
  }
}

//delete book data
const deleteABook = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook) {
      res.status(404).send({message: "Book is not Found!"})
    }
    res.status(200).send({
      message: "Book deleted successfully",
      book: deletedBook
    })
  } catch (error) {
    console.error("Error deleting a book", error);
    res.status(500).send({message: "Failed to delete a book"})
  }
}

// Add review to a book
const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userName, rating, comment } = req.body;

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found!" });
    }

    const newReview = {
      userId,
      userName,
      rating,
      comment
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).send({ message: "Review added successfully", book });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).send({ message: "Failed to add review" });
  }
};

module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updatedBook,
  deleteABook,
  addReview,
  likeBook,
  getRecommendedBooks
};