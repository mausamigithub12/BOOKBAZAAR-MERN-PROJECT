// // import React from 'react'
// // import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
// // import { Link, useNavigate } from 'react-router-dom';

// // const ManageBooks = () => {
// //     const navigate = useNavigate();

// //     const { data, refetch } = useFetchAllBooksQuery();

// //     // 🔍 Extract books safely from API response
// //     const books = data?.books || [];

// //     const [deleteBook] = useDeleteBookMutation();

// //     // Handle deleting a book
// //     const handleDeleteBook = async (id) => {
// //         try {
// //             await deleteBook(id).unwrap();
// //             alert('Book deleted successfully!');
// //             refetch();
// //         } catch (error) {
// //             console.error('Failed to delete book:', error.message);
// //             alert('Failed to delete book. Please try again.');
// //         }
// //     };

// //     return (
// //         <section className="py-1 bg-blueGray-50">
// //             <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
// //                 <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
// //                     <div className="rounded-t mb-0 px-4 py-3 border-0">
// //                         <div className="flex flex-wrap items-center">
// //                             <div className="relative w-full px-4 max-w-full flex-grow flex-1">
// //                                 <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
// //                             </div>
// //                             <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
// //                                 <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
// //                                     See all
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     <div className="block w-full overflow-x-auto">
// //                         <table className="items-center bg-transparent w-full border-collapse">
// //                             <thead>
// //                                 <tr>
// //                                     <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">#</th>
// //                                     <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Book Title</th>
// //                                     <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Category</th>
// //                                     <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Price</th>
// //                                     <th className="px-6 bg-blueGray-50 text-blueGray-500 border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">Actions</th>
// //                                 </tr>
// //                             </thead>

// //                             <tbody>
// //                                 {Array.isArray(books) && books.length > 0 ? (
// //                                     books.map((book, index) => (
// //                                         <tr key={book._id}>
// //                                             <th className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{index + 1}</th>
// //                                             <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">{book.title}</td>
// //                                             <td className="border-t-0 px-6 align-center text-xs whitespace-nowrap p-4">{book.category}</td>
// //                                             <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">${book.newPrice}</td>
// //                                             <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 space-x-4">
// //                                                 <Link to={`/dashboard/edit-book/${book._id}`} className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline underline-offset-2">Edit</Link>
// //                                                 <button onClick={() => handleDeleteBook(book._id)} className="font-medium bg-red-500 py-1 px-4 rounded-full text-white">Delete</button>
// //                                             </td>
// //                                         </tr>
// //                                     ))
// //                                 ) : (
// //                                     <tr>
// //                                         <td colSpan="5" className="text-center py-4 text-gray-500">No books found.</td>
// //                                     </tr>
// //                                 )}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };

// // export default ManageBooks;


// import React from 'react';
// import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const ManageBooks = () => {
//   const navigate = useNavigate();
//   const { data, refetch } = useFetchAllBooksQuery();
//   const books = data?.books || [];

//   const [deleteBook] = useDeleteBookMutation();

//   const handleDeleteBook = async (id) => {
//     try {
//       await deleteBook(id).unwrap();
//       Swal.fire('Deleted!', 'Book has been deleted.', 'success');
//       refetch();
//     } catch (error) {
//       console.error('Delete failed:', error);
//       Swal.fire('Error', 'Failed to delete book.', 'error');
//     }
//   };

//   return (
//     <section className="py-1 bg-blueGray-50">
//       <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
//         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
//           <div className="rounded-t mb-0 px-4 py-3 border-0">
//             <div className="flex flex-wrap items-center justify-between">
//               <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
//             </div>
//           </div>
//           <div className="block w-full overflow-x-auto">
//             <table className="items-center bg-transparent w-full border-collapse">
//               <thead>
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase border">#</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase border">Book Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase border">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase border">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-semibold text-blueGray-500 uppercase border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {books.map((book, index) => (
//                   <tr key={book._id}>
//                     <td className="px-6 py-4 border">{index + 1}</td>
//                     <td className="px-6 py-4 border">{book.title}</td>
//                     <td className="px-6 py-4 border">{book.category}</td>
//                     <td className="px-6 py-4 border">${book.newPrice}</td>
//                     <td className="px-6 py-4 border">
//                       <Link to={`/dashboard/edit-book/${book._id}`} className="text-indigo-600 hover:underline mr-4">Edit</Link>
//                       <button onClick={() => handleDeleteBook(book._id)} className="text-red-600 hover:underline">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//                 {books.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="text-center py-4 text-gray-500">No books found.</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ManageBooks;



import React, { useEffect } from 'react';
import { useDeleteBookMutation, useFetchAllBooksQuery } from '../../../redux/features/books/booksApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageBooks = () => {
  const { data, refetch } = useFetchAllBooksQuery();
  const books = data?.books || [];
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id).unwrap();
      Swal.fire('Deleted!', 'Book has been deleted.', 'success');
      refetch();
    } catch (error) {
      console.error('Delete failed:', error);
      Swal.fire('Error', 'Failed to delete book.', 'error');
    }
  };

  // ✅ Refetch books when page loads
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="font-semibold text-base text-blueGray-700">All Books</h3>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 py-3 border text-left text-xs font-semibold uppercase text-blueGray-500">#</th>
                  <th className="px-6 py-3 border text-left text-xs font-semibold uppercase text-blueGray-500">Book Title</th>
                  <th className="px-6 py-3 border text-left text-xs font-semibold uppercase text-blueGray-500">Category</th>
                  <th className="px-6 py-3 border text-left text-xs font-semibold uppercase text-blueGray-500">Price</th>
                  <th className="px-6 py-3 border text-left text-xs font-semibold uppercase text-blueGray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id}>
                    <td className="px-6 py-4 border">{index + 1}</td>
                    <td className="px-6 py-4 border">{book.title}</td>
                    <td className="px-6 py-4 border">{book.category}</td>
                    <td className="px-6 py-4 border">${book.newPrice}</td>
                    <td className="px-6 py-4 border">
                      <Link to={`/dashboard/edit-book/${book._id}`} className="text-indigo-600 hover:underline mr-4">Edit</Link>
                      <button onClick={() => handleDeleteBook(book._id)} className="text-red-600 hover:underline">Delete</button>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No books found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageBooks;

