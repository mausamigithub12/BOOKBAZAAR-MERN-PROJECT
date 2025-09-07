
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-4">
       
        <div className="sm:w-40 sm:h-60 w-full h-48 flex-shrink-0 rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={book.title}
              className="w-full h-full object-contain bg-gray-100 p-2 cursor-pointer hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                // e.target.src = "https://via.placeholder.com/160x240?text=No+Image";
                e.target.className = "w-full h-full object-cover bg-gray-200";
              }}
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-60">
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 mb-3 line-clamp-2">
                {book?.title}
              </h3>
            </Link>
            
            <div className="flex items-center mb-3">
              <LikeButton 
                bookId={book._id} 
                initialLikes={book.likes?.length || 0} 
                initialLiked={book.likes?.some(like => like.userId === localStorage.getItem('uid'))}
              />
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
              {book?.description}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-medium text-lg text-gray-900">
                Rs.{book?.newPrice?.toFixed(2)}
              </p>
              {book?.oldPrice && book.oldPrice > book.newPrice && (
                <p className="line-through font-normal text-gray-500 text-sm">
                  Rs.{book?.oldPrice?.toFixed(2)}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(book);
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <FiShoppingCart className="text-lg" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;