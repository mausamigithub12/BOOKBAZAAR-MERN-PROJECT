
import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Recommended = () => {
  const { data, isLoading, isError } = useFetchAllBooksQuery();
  const swiperRef = useRef(null);

  if (isLoading) return <p>Loading recommended books...</p>;
  if (isError) return <p>Failed to load recommended books.</p>;

  // Safely extract books array
  const books = data?.books || (Array.isArray(data) ? data : []);
  const recommendedBooks = books.slice(0, 10);

  return (
    <div className="py-16 relative">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={30}
        navigation={false} // disable default nav
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 3, spaceBetween: 50 }
        }}
      >
        {recommendedBooks.map((book) => (
          <SwiperSlide key={book._id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-100"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Recommended;
