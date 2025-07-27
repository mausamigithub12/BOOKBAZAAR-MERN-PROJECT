
import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data, isLoading, isError } = useFetchAllBooksQuery();

  console.log("API data:", data);

  // Adjust this based on structure:
  const books = Array.isArray(data)
    ? data
    : Array.isArray(data?.books)
      ? data.books
      : data
        ? Object.values(data)
        : [];

  console.log("books to render:", books);

  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book =>
        book?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  console.log("filteredBooks:", filteredBooks);

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <div className="py-10">
      <h2 className="text-3xl font-semibold mb-6">Top Sellers</h2>
      <div className="mb-8 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <Swiper
        slidesPerView={1} spaceBetween={30}
        navigation modules={[Pagination, Navigation]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 }
        }}
      >
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, idx) => (
            <SwiperSlide key={idx}><BookCard book={book} /></SwiperSlide>
          ))
        ) : (
          <p className="text-gray-500">No books found for this category.</p>
        )}
      </Swiper>
    </div>
  );
};

export default TopSellers;
