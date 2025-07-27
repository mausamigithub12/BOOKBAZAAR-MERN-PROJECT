
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
