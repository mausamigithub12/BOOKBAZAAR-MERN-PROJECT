


// import React from 'react'
// import { FiShoppingCart } from "react-icons/fi"
// import { Link, useParams } from "react-router-dom"

// import { getImgUrl } from '../../utils/getImgUrl';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/features/cart/cartSlice';
// import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';

// const SingleBook = () => {
//     const {id} = useParams();
//     const {data, isLoading, isError} = useFetchBookByIdQuery(id);
// const book = data?.book; 
//     const dispatch =  useDispatch();

//     const handleAddToCart = (product) => {
//         dispatch(addToCart(product))
//     }

//     if(isLoading) return <div>Loading...</div>
//     if(isError) return <div>Error happending to load book info</div>

//     console.log(book); 


//    // Use direct URL if image is from online, otherwise load from local folder
//    const imageSrc = book.coverImage.startsWith("http")
//      ? book.coverImage
//      : getImgUrl(book.coverImage);


//   return (
//     <div className="max-w-sm shadow-md p-5 m-auto">
//             <h1 className="text-2xl font-bold mb-6">{book.title}</h1>

//             <div className=''>
//                 {/* <div>
//                     <img
//                         src={`${getImgUrl(book.coverImage)}`}
//                         alt={book.title}
//                         className="mb-8"
//                     />
//                 </div> */}


//                  <div>
//         <Link to={`/books/${book._id}`}>
//           <div className="w-full h-64 overflow-hidden rounded-t-xl">
//             <img
//               src={imageSrc}
//               alt={book?.title}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </Link>
//       </div>

//                 <div className='mb-5'>
//                     <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
//                     <p className="text-gray-700 mb-4">
//                         <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
//                     </p>
//                     <p className="text-gray-700 mb-4 capitalize">
//                         <strong>Category:</strong> {book?.category}
//                     </p>
//                     <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
//                     <p className="text-gray-700"><strong>Total price:</strong> Rs. {book.totalPrice}</p>
//                 </div>

//                 <button onClick={() => handleAddToCart(book)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
//                     <FiShoppingCart className="" />
//                     <span>Add to Cart</span>

//                 </button>
//             </div>
//         </div>
//   )
// }

// export default SingleBook



// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { getImgUrl } from '../../utils/getImgUrl';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/features/cart/cartSlice';
// import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
// import ReviewForm from '../../components/ReviewForm';
// import ReviewsList from '../../components/ReviewsList';
// import LikeButton from '../../components/LikeButton';
// import axios from 'axios';

// import api from '../../utils/api';
// import RecommendedBooks from '../books/RecommendedBooks';
// // import axios from 'axios';



// const SingleBook = () => {
//   const { id } = useParams();
//   const { data, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
//   const [localBook, setLocalBook] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const trackView = async () => {
//       try {
//         await api.post(
//           // `${import.meta.env.VITE_API_BASE_URL}/books/${id}/view`,
//           `${import.meta.env.VITE_API_BASE_URL}/books/${id}/view`,
//           {},
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//       } catch (error) {
//         console.error('View tracking failed:', error.message);
//       }
//     };

//     if (id) trackView();
//   }, [id]);

//   useEffect(() => {
//     if (data?.book) {
//       setLocalBook(data.book);
//     }
//   }, [data]);

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
//   };

//   const handleReviewSubmit = (updatedBook) => {
//     setLocalBook(updatedBook);
//     refetch();
//   };

//   if (isLoading) return <div className="text-center py-8">Loading book details...</div>;
//   if (isError) return <div className="text-center py-8 text-red-500">Error loading book information</div>;
//   if (!localBook) return <div className="text-center py-8">Book not found</div>;

//   const imageSrc = localBook.coverImage.startsWith("http")
//     ? localBook.coverImage
//     : getImgUrl(localBook.coverImage);

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <div className="grid md:grid-cols-2 gap-8 mb-12">
//         <div className="bg-white rounded-lg shadow-md overflow-hidden">
//           <img
//             src={imageSrc}
//             alt={localBook.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
        
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{localBook.title}</h1>
          
//           <div className="flex items-center mb-4">
//             <LikeButton 
//               bookId={localBook._id} 
//               initialLikes={localBook.likes?.length || 0} 
//               initialLiked={localBook.likes?.some(like => like.userId === localStorage.getItem('uid'))}
//             />
//             <span className="ml-4 text-gray-600">
//               {localBook.viewCount || 0} views
//             </span>
//           </div>
          
//           <div className="mb-6">
//             <p className="text-gray-700 mb-2">
//               <strong>Category:</strong> <span className="capitalize">{localBook.category}</span>
//             </p>
//             <p className="text-2xl font-semibold mb-2">
//               ${localBook.newPrice.toFixed(2)}
//               {localBook.oldPrice && (
//                 <span className="ml-2 text-lg text-gray-500 line-through">
//                   ${localBook.oldPrice.toFixed(2)}
//                 </span>
//               )}
//             </p>
//             <p className="text-gray-700 mb-4">
//               <strong>Description:</strong> {localBook.description}
//             </p>
//           </div>
          
//           <button 
//             onClick={() => handleAddToCart(localBook)} 
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
      
//       <div className="mb-12">
//         <ReviewsList reviews={localBook.reviews || []} />
//         <ReviewForm onReviewSubmit={handleReviewSubmit} />
//       </div>
      
//       <div className="mb-8">
//         <RecommendedBooks 
//           currentBookId={localBook._id} 
//           category={localBook.category} 
//         />
//       </div>
//     </div>
//   );
// };

// export default SingleBook;



import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import ReviewForm from '../../components/ReviewForm';
import ReviewsList from '../../components/ReviewsList';
import LikeButton from '../../components/LikeButton';
import RecommendedBooks from '../books/RecommendedBooks';

const SingleBook = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [localBook, setLocalBook] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data?.book) {
      setLocalBook(data.book);
    }
  }, [data]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleReviewSubmit = (updatedBook) => {
    setLocalBook(updatedBook);
    refetch();
  };

  if (isLoading) return <div className="text-center py-8">Loading book details...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading book information</div>;
  if (!localBook) return <div className="text-center py-8">Book not found</div>;

  const imageSrc = localBook.coverImage.startsWith("http")
    ? localBook.coverImage
    : getImgUrl(localBook.coverImage);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={imageSrc}
            alt={localBook.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{localBook.title}</h1>
          
          <div className="flex items-center mb-4">
            <LikeButton 
              bookId={localBook._id} 
              initialLikes={localBook.likes?.length || 0} 
              initialLiked={localBook.likes?.some(like => like.userId === localStorage.getItem('uid'))}
            />
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> <span className="capitalize">{localBook.category}</span>
            </p>
            <p className="text-2xl font-semibold mb-2">
              ${localBook.newPrice.toFixed(2)}
              {localBook.oldPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${localBook.oldPrice.toFixed(2)}
                </span>
              )}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Description:</strong> {localBook.description}
            </p>
          </div>
          
          <button 
            onClick={() => handleAddToCart(localBook)} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mb-12">
        <ReviewsList reviews={localBook.reviews || []} />
        <ReviewForm onReviewSubmit={handleReviewSubmit} />
      </div>
      
      <div className="mb-8">
        <RecommendedBooks 
          currentBookId={localBook._id} 
          category={localBook.category} 
        />
      </div>
    </div>
  );
};

export default SingleBook;