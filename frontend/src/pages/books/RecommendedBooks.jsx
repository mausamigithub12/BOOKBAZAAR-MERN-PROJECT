
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import 'swiper/css';
import 'swiper/css/navigation';
import api from '../../utils/api';

const RecommendedBookCard = ({ book }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (book?.coverImage) {
      const url = `${getImgUrl(book.coverImage)}?t=${new Date().getTime()}`;
      setImageUrl(url);
      setImageError(false);
    }
  }, [book?.coverImage]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(book));
  };

  const handleImageError = () => {
    setImageError(true);
    // setImageUrl("https://via.placeholder.com/150x220?text=No+Image");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <Link to={`/books/${book._id}`} className="block flex-grow">
        <div className="h-48 w-full overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight text-sm">
            {book?.title}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <p className="font-bold text-blue-600 text-lg">
                Rs.{book?.newPrice?.toFixed(2)}
              </p>
              {book?.oldPrice && book.oldPrice > book.newPrice && (
                <p className="line-through font-normal text-gray-500 text-xs">
                  Rs.{book?.oldPrice?.toFixed(2)}
                </p>
              )}
            </div>
            
            <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
              <FiHeart className="text-lg" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 text-sm font-medium"
          >
            <FiShoppingCart className="text-base" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

const RecommendedBooks = ({ currentBookId, category }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedBooks = async () => {
      if (!category || !currentBookId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get(`/books/${currentBookId}/recommendations`, {
          params: { category }
        });
        
        const books = response.data?.recommendedBooks || 
                      response.recommendedBooks || 
                      [];
        
        setRecommendedBooks(books.slice(0, 12)); 
      } catch (err) {
        console.error('Recommendation error:', err);
        setError(err.response?.data?.message || 
                'Failed to load recommendations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedBooks();
  }, [category, currentBookId]);

  if (loading) {
    return (
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Readers Also Enjoyed</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-md p-4 animate-pulse h-80">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recommended for you</h2>
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
      </div>
    );
  }

  if (recommendedBooks.length === 0) {
    return null; // Don't show anything if no recommendations
  }

  return (
    <div className="py-8 px-4 bg-gray-50 rounded-2xl mt-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
          More from <span className="text-blue-600 capitalize">{category}</span>
        </h2>
        
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 },
            640: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 5, spaceBetween: 20 }
          }}
          className="pb-12" 
        >
          {recommendedBooks.map((book) => (
            <SwiperSlide key={book._id} className="h-auto">
              <RecommendedBookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecommendedBooks;