// import React, { useEffect, useState } from 'react'
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // import required modules
// import { Pagination, Navigation } from 'swiper/modules';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import BookCard from '../books/BookCard';
// import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


// const Recommended = () => {
   

//     const {data: books = []} = useFetchAllBooksQuery();
//   return (
//     <div className='py-16'>
//          <h2 className='text-3xl font-semibold mb-6'>Recommended for you </h2>


//          <Swiper
//                 slidesPerView={1}
//                 spaceBetween={30}
//                 navigation={true}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 1,
//                         spaceBetween: 20,
//                     },
//                     768: {
//                         slidesPerView: 2,
//                         spaceBetween: 40,
//                     },
//                     1024: {
//                         slidesPerView: 2,
//                         spaceBetween: 50,
//                     },
//                     1180: {
//                         slidesPerView: 3,
//                         spaceBetween: 50,
//                     }
//                 }}
//                 modules={[Pagination, Navigation]}
//                 className="mySwiper"
//             >

//                 {
//                    books.length > 0 && books.slice(8, 18).map((book, index) => (
//                         <SwiperSlide key={index}>
//                             <BookCard  book={book} />
//                         </SwiperSlide>
//                     ))
//                 }



//             </Swiper>
//     </div>
//   )
// }

// export default Recommended


import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const Recommended = () => {
  const { data, isLoading, isError } = useFetchAllBooksQuery();

  console.log("Fetched books:", data);

  // Handle loading or error state
  if (isLoading) return <p>Loading recommended books...</p>;
  if (isError) return <p>Failed to load recommended books.</p>;

  const books = Array.isArray(data)
    ? data
    : Array.isArray(data?.books)
      ? data.books
      : data
        ? Object.values(data)
        : [];

  const recommendedBooks = books.slice(0, 10); // safer than 8–18 for now

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {recommendedBooks.length > 0 ? (
          recommendedBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))
        ) : (
          <p>No recommended books found.</p>
        )}
      </Swiper>
    </div>
  );
};

export default Recommended;
