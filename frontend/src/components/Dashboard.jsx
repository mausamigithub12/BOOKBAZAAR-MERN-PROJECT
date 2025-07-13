// import React, { useState } from 'react';
// import { 
//   FaBook, FaUsers, FaTags, FaCommentAlt, FaMoneyBillWave, 
//   FaSearch, FaEdit, FaTrash, FaPlus, FaHome, 
//   FaChartLine, FaCog, FaSignOutAlt, FaBookOpen 
// } from 'react-icons/fa';

// const Dashboard = () => {
//   // Sample data for books
//   const [books, setBooks] = useState([
//     { id: 1, title: 'The GRE Prep Guide', description: 'The GRE is a standardized test widely used for graduate school admissions.', rating: 5, discount: '5%', tags: 'Network', price: 49.99, image: 'https://via.placeholder.com/150x200?text=GRE+Guide' },
//     { id: 2, title: 'SAT Complete Guide', description: 'The SAT is a standardized test widely used for college admissions.', rating: 5, discount: '5%', tags: 'SAT', price: 39.99, image: 'https://via.placeholder.com/150x200?text=SAT+Guide' },
//     { id: 3, title: 'Data Structures Mastery', description: 'Data Structures and Algorithms (DSA) fundamental concepts.', rating: 4, discount: '5%', tags: 'DSA Algorithm', price: 59.99, image: 'https://via.placeholder.com/150x200?text=DSA+Book' },
//     { id: 4, title: 'Blockchain Fundamentals', description: 'Blockchain technology is an advanced database mechanism.', rating: 4, discount: '5%', tags: 'blockchain', price: 69.99, image: 'https://via.placeholder.com/150x200?text=Blockchain' },
//   ]);

//   // Sample data for testimonials
//   const testimonials = [
//     { id: 1, name: 'Sarah Johnson', comment: 'Amazing collection and fast delivery!', rating: 5 },
//     { id: 2, name: 'Michael Chen', comment: 'Great prices and excellent customer service.', rating: 4 },
//   ];

//   // State for new book form
//   const [newBook, setNewBook] = useState({
//     title: '',
//     description: '',
//     rating: 0,
//     discount: '',
//     tags: '',
//     price: '',
//     image: ''
//   });

//   const [editingBook, setEditingBook] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('books');
//   const [showAddBookModal, setShowAddBookModal] = useState(false);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (editingBook) {
//       setEditingBook({ ...editingBook, [name]: value });
//     } else {
//       setNewBook({ ...newBook, [name]: value });
//     }
//   };

//   // Add new book
//   const addBook = (e) => {
//     e.preventDefault();
//     const book = {
//       id: books.length + 1,
//       ...newBook,
//       rating: parseInt(newBook.rating)
//     };
//     setBooks([...books, book]);
//     setNewBook({
//       title: '',
//       description: '',
//       rating: 0,
//       discount: '',
//       tags: '',
//       price: '',
//       image: ''
//     });
//     setShowAddBookModal(false);
//   };

//   // Edit book
//   const editBook = (book) => {
//     setEditingBook(book);
//     setShowAddBookModal(true);
//   };

//   // Update book
//   const updateBook = (e) => {
//     e.preventDefault();
//     setBooks(books.map(book => book.id === editingBook.id ? editingBook : book));
//     setEditingBook(null);
//     setShowAddBookModal(false);
//   };

//   // Delete book
//   const deleteBook = (id) => {
//     setBooks(books.filter(book => book.id !== id));
//   };

//   // Filter books based on search term
//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Calculate total revenue
//   const totalRevenue = books.reduce((sum, book) => sum + book.price, 0);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left Side Panel */}
//       <div className="w-64 bg-black text-white shadow-lg">
//         <div className="p-4 border-b border-amber-700">
//           <h1 className="text-xl font-bold flex items-center">
//             <FaBookOpen className="mr-2" /> BookBaazar
//           </h1>
//         </div>
        
//         <nav className="p-4">
//           <ul className="space-y-2">
//             <li>
//               <button 
//                 onClick={() => setActiveTab('dashboard')}
//                 className={flex items-center w-full p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-amber-700' : 'hover:bg-indigo-700'}}
//               >
//                 <FaHome className="mr-3" /> Dashboard
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('books')}
//                 className={flex items-center w-full p-3 rounded-lg ${activeTab === 'books' ? 'bg-amber-700' : 'hover:bg-indigo-700'}}
//               >
//                 <FaBook className="mr-3" /> Books
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('categories')}
//                 className={flex items-center w-full p-3 rounded-lg ${activeTab === 'categories' ? 'bg-amber-700' : 'hover:bg-amber-700'}}
//               >
//                 <FaTags className="mr-3" /> Categories
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('testimonials')}
//                 className={flex items-center w-full p-3 rounded-lg ${activeTab === 'testimonials' ? 'bg-amber-700' : 'hover:bg-amber-700'}}
//               >
//                 <FaCommentAlt className="mr-3" /> Testimonials
//               </button>
//             </li>
//             <li>
//               <button 
//                 onClick={() => setActiveTab('analytics')}
//                 className={flex items-center w-full p-3 rounded-lg ${activeTab === 'analytics' ? 'bg-amber-700' : 'hover:bg-amber-700'}}
//               >
//                 <FaChartLine className="mr-3" /> Analytics
//               </button>
//             </li>
//           </ul>
//         </nav>
        
//         <div className="absolute bottom-0 w-64 p-4 border-t border-amber-700">
//           <ul className="space-y-2">
//             <li>
//               <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-700">
//                 <FaCog className="mr-3" /> Settings
//               </button>
//             </li>
//             <li>
//               <button className="flex items-center w-full p-3 rounded-lg hover:bg-amber-700 text-red-300">
//                 <FaSignOutAlt className="mr-3" /> Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 overflow-y-auto">
//         {/* Header */}
//         <header className="bg-white shadow-sm p-4">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               {activeTab === 'dashboard' && 'Dashboard'}
//               {activeTab === 'books' && 'Book Management'}
//               {activeTab === 'categories' && 'Categories'}
//               {activeTab === 'testimonials' && 'Testimonials'}
//               {activeTab === 'analytics' && 'Analytics'}
//             </h2>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search books..."
//                 className="pl-10 pr-4 py-2 border rounded-lg w-64"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="p-6">
//           {activeTab === 'dashboard' && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <DashboardCard 
//                 icon={<FaUsers className="text-amber-600 text-xl" />} 
//                 title="Registrations" 
//                 value="1,245" 
//                 color="bg-indigo-100"
//               />
//               <DashboardCard 
//                 icon={<FaBook className="text-amber-600 text-xl" />} 
//                 title="Books" 
//                 value={books.length} 
//                 color="bg-indigo-100"
//               />
//               <DashboardCard 
//                 icon={<FaCommentAlt className="text-amber-600 text-xl" />} 
//                 title="Testimonials" 
//                 value={testimonials.length} 
//                 color="bg-indigo-100"
//               />
//               <DashboardCard 
//                 icon={<FaMoneyBillWave className="text-amber-600 text-xl" />} 
//                 title="Revenue" 
//                 value={$${totalRevenue.toFixed(2)}} 
//                 color="bg-indigo-100"
//               />
//             </div>
//           )}

//           {activeTab === 'books' && (
//             <>
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold">All Books</h3>
//                 <button
//                   onClick={() => {
//                     setEditingBook(null);
//                     setShowAddBookModal(true);
//                   }}
//                   className="flex items-center bg-gradient-to-r from-amber-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
//                 >
//                   <FaPlus className="mr-2" /> Add New Book
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredBooks.map((book) => (
//                   <BookCard 
//                     key={book.id} 
//                     book={book} 
//                     onEdit={() => editBook(book)}
//                     onDelete={() => deleteBook(book.id)}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           {activeTab === 'testimonials' && (
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-xl font-semibold mb-6">Customer Testimonials</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {testimonials.map((testimonial) => (
//                   <TestimonialCard key={testimonial.id} testimonial={testimonial} />
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>
//       </div>

//       {/* Add/Edit Book Modal */}
//       {showAddBookModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold text-gray-800">
//                   {editingBook ? 'Edit Book' : 'Add New Book'}
//                 </h3>
//                 <button 
//                   onClick={() => {
//                     setShowAddBookModal(false);
//                     setEditingBook(null);
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <form onSubmit={editingBook ? updateBook : addBook}>
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Book Cover</label>
//                       <div className="flex items-center justify-center w-full">
//                         <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                             <FaPlus className="text-gray-400 text-2xl mb-2" />
//                             <p className="text-sm text-gray-500">Click to upload cover image</p>
//                           </div>
//                           <input type="file" className="hidden" />
//                         </label>
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
//                         <input
//                           type="text"
//                           name="title"
//                           value={editingBook ? editingBook.title : newBook.title}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)*</label>
//                         <input
//                           type="number"
//                           name="price"
//                           value={editingBook ? editingBook.price : newBook.price}
//                           onChange={handleInputChange}
//                           className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
//                     <textarea
//                       name="description"
//                       value={editingBook ? editingBook.description : newBook.description}
//                       onChange={handleInputChange}
//                       className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       rows="4"
//                       required
//                     ></textarea>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)*</label>
//                       <select
//                         name="rating"
//                         value={editingBook ? editingBook.rating : newBook.rating}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                       >
//                         <option value="">Select rating</option>
//                         <option value="1">1 ★</option>
//                         <option value="2">2 ★★</option>
//                         <option value="3">3 ★★★</option>
//                         <option value="4">4 ★★★★</option>
//                         <option value="5">5 ★★★★★</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
//                       <input
//                         type="text"
//                         name="discount"
//                         value={editingBook ? editingBook.discount : newBook.discount}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Tags*</label>
//                       <input
//                         type="text"
//                         name="tags"
//                         value={editingBook ? editingBook.tags : newBook.tags}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex justify-end space-x-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowAddBookModal(false);
//                       setEditingBook(null);
//                     }}
//                     className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                   >
//                     {editingBook ? 'Update Book' : 'Add Book'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Component for Dashboard Cards
// const DashboardCard = ({ icon, title, value, color }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
//     <div className="flex items-center">
//       <div className={p-3 ${color} rounded-full mr-4}>
//         {icon}
//       </div>
//       <div>
//         <h3 className="text-gray-500">{title}</h3>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   </div>
// );

// // Component for Book Cards
// const BookCard = ({ book, onEdit, onDelete }) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//     <div className="h-48 overflow-hidden">
//       <img 
//         src={book.image || 'https://via.placeholder.com/300x200?text=Book+Cover'} 
//         alt={book.title}
//         className="w-full h-full object-cover"
//       />
//     </div>
//     <div className="p-4">
//       <h3 className="font-semibold text-lg mb-1 truncate">{book.title}</h3>
//       <p className="text-gray-600 text-sm mb-2 line-clamp-2">{book.description}</p>
//       <div className="flex justify-between items-center mb-3">
//         <span className="font-bold text-indigo-600">${book.price}</span>
//         <div className="flex items-center">
//           <span className="text-yellow-400 mr-1">★</span>
//           <span>{book.rating}</span>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{book.tags}</span>
//         <div className="flex space-x-2">
//           <button 
//             onClick={onEdit}
//             className="text-indigo-600 hover:text-indigo-800"
//             title="Edit"
//           >
//             <FaEdit />
//           </button>
//           <button 
//             onClick={onDelete}
//             className="text-red-600 hover:text-red-800"
//             title="Delete"
//           >
//             <FaTrash />
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // Component for Testimonial Cards
// const TestimonialCard = ({ testimonial }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
//     <div className="flex items-center mb-3">
//       {[...Array(5)].map((_, i) => (
//         <span key={i} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}>
//           ★
//         </span>
//       ))}
//     </div>
//     <p className="text-gray-600 italic mb-4">"{testimonial.comment}"</p>
//     <p className="font-medium text-indigo-700">— {testimonial.name}</p>
//   </div>
// );

// export default Dashboard;



