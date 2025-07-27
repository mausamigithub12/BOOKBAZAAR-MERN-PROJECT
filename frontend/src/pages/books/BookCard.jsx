




// // import React from "react";
// // import { FiShoppingCart } from "react-icons/fi";
// // import { getImgUrl } from "../../utils/getImgUrl";
// // import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // import { addToCart } from "../../redux/features/cart/cartSlice";
// // import LikeButton from "../../components/LikeButton";

// // const BookCard = ({ book }) => {
// //   const dispatch = useDispatch();

// //   const handleAddToCart = (product) => {
// //     dispatch(addToCart(product));
// //   };

// //   const isLikedByCurrentUser = book?.likes?.some(
// //     (like) => like.userId === localStorage.getItem("uid")
// //   );

// //   return (
// //     <div className="rounded-lg transition-shadow duration-300">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 mt-10 sm:justify-center gap-4">
// //         <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
// //           <Link to={`/books/${book._id}`}>
// //             <img
// //               src={`${getImgUrl(book?.coverImage)}`}
// //               alt={book?.title}
// //               className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
// //             />
// //           </Link>
// //         </div>

// //         <div className="flex flex-col justify-between">
// //           <Link to={`/books/${book._id}`}>
// //             <h3 className="text-lg font-semibold hover:text-blue-600 mb-3">
// //               {book?.title}
// //             </h3>
// //           </Link>

// //           <p className="text-gray-600 mb-5 w-40">
// //             {book?.description.length > 80
// //               ? `${book.description.slice(0, 80)}...`
// //               : book?.description}
// //           </p>

// //           <p className="font-medium mb-3">
// //             ${book?.newPrice}{" "}
// //             <span className="line-through font-normal ml-2">
// //               ${book?.oldPrice}
// //             </span>
// //           </p>

// //           {/* Like Button */}
// //           <div className="mb-4">
// //             <LikeButton
// //               bookId={book._id}
// //               initialLikes={book.likes?.length || 0}
// //               initialLiked={isLikedByCurrentUser}
// //             />
// //           </div>

// //           <button
// //             onClick={() => handleAddToCart(book)}
// //             className="btn-primary px-6 space-x-1 flex items-center gap-12 whitespace-nowrap"
// //           >
// //             <FiShoppingCart className="-mx-10" />
// //             <span>Add to Cart</span>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default BookCard;



// import React, { useState } from "react";
// import { FiShoppingCart } from "react-icons/fi";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { getImgUrl } from "../../utils/getImgUrl";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import api from "../../utils/api";
// // import LikeButton from '../../components/LikeButton';

// const BookCard = ({ book }) => {
//   const dispatch = useDispatch();
//   const [isLiked, setIsLiked] = useState(
//     book.likes?.some(like => like.userId === localStorage.getItem('uid'))
//   );
//   const [likeCount, setLikeCount] = useState(book.likes?.length || 0);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   const handleLike = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     try {
//       const response = await api.post(`/books/${book._id}/like`, {
//         userId: localStorage.getItem('uid')
//       });
//       setIsLiked(response.data.liked);
//       setLikeCount(response.data.book.likes.length);
//     } catch (error) {
//       console.error('Like action failed:', error);
//     }
//   };

//   return (
//     <div className="rounded-lg transition-shadow duration-300">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 mt-10 sm:justify-center gap-4">
//         <div className="sm:h-72 sm:flex-shrink-0 border rounded-md relative">
//           <Link to={`/books/${book._id}`}>
//             <img
//               src={`${getImgUrl(book?.coverImage)}`}
//               alt={book.title}
//               className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
//             />
//           </Link>
//           <button 
//             onClick={handleLike}
//             className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors z-10"
//             aria-label={isLiked ? 'Unlike' : 'Like'}
//           >
//             {isLiked ? (
//               <FaHeart className="text-red-500" />
//             ) : (
//               <FaRegHeart className="text-red-500" />
//             )}
//           </button>
//           {likeCount > 0 && (
//             <span className="absolute top-3 right-12 bg-white/80 px-2 py-1 rounded-full text-xs">
//               {likeCount}
//             </span>
//           )}
//         </div>

//         <div>
//           <Link to={`/books/${book._id}`}>
//             <h3 className="text-lg font-semibold hover:text-blue-600 mb-3">
//               {book?.title}
//             </h3>
//           </Link>

//           <p className="text-gray-600 mb-5 line-clamp-3">
//             {book?.description}
//           </p>
          
//           <div className="flex items-center gap-4 mb-5">
//             <p className="font-medium">
//               ${book?.newPrice?.toFixed(2)}
//             </p>
//             {book?.oldPrice && (
//               <p className="line-through font-normal text-gray-500">
//                 ${book?.oldPrice?.toFixed(2)}
//               </p>
//             )}
//           </div>
          
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               handleAddToCart(book);
//             }}
//             className="btn-primary px-6 space-x-1 flex items-center gap-12 whitespace-nowrap"
//           >
//             <FiShoppingCart className="-mx-10" />
//             <span>Add to Cart</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookCard;



import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import LikeButton from "../../components/LikeButton";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 mt-10 sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md relative">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book.title}
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>

          {/* Like Button Component */}
          {/* <div className="absolute top-3 right-3 z-10">
            <LikeButton 
              bookId={book._id}
              initialLikes={book.likes?.length || 0}
              initialLiked={book.likes?.some(like => like.userId === localStorage.getItem('uid'))}
            />
          </div>
        </div> */}

        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-lg font-semibold hover:text-blue-600 mb-3">
              {book?.title}
            </h3>
 </Link>
            <div className="flex items-center mb-4">
            <LikeButton 
              bookId={book._id} 
              initialLikes={book.likes?.length || 0} 
              initialLiked={book.likes?.some(like => like.userId === localStorage.getItem('uid'))}
            />
          </div>
         
             
             {/* Like Button Component */}
          {/* <div className="absolute top-3 right-3 z-10">
            <LikeButton 
              bookId={book._id}
              initialLikes={book.likes?.length || 0}
              initialLiked={book.likes?.some(like => like.userId === localStorage.getItem('uid'))}
            />
          </div> */}
        {/* </div> */}


          <p className="text-gray-600 mb-5 line-clamp-3">
            {book?.description}
          </p>

          <div className="flex items-center gap-4 mb-5">
            <p className="font-medium">
              ${book?.newPrice?.toFixed(2)}
            </p>
            {book?.oldPrice && (
              <p className="line-through font-normal text-gray-500">
                ${book?.oldPrice?.toFixed(2)}
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart(book);
            }}
            className="btn-primary px-6 space-x-1 flex items-center gap-12 whitespace-nowrap"
          >
            <FiShoppingCart className="-mx-10" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
