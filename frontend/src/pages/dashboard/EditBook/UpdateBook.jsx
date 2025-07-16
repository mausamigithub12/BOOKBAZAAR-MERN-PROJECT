// import React, { useEffect } from 'react';
// import InputField from '../addBook/InputField';
// import SelectField from '../addBook/SelectField';
// import { useForm } from 'react-hook-form';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
// import Loading from '../../../components/Loading';
// import Swal from 'sweetalert2';

// const UpdateBook = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading, isError } = useFetchBookByIdQuery(id);
//   const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

//   const bookData = data?.book;

//   const { register, handleSubmit, setValue } = useForm();

//   useEffect(() => {
//     if (bookData) {
//       setValue('title', bookData.title);
//       setValue('description', bookData.description);
//       setValue('category', bookData.category);
//       setValue('trending', bookData.trending);
//       setValue('oldPrice', bookData.oldPrice);
//       setValue('newPrice', bookData.newPrice);
//       setValue('coverImage', bookData.coverImage);
//     }
//   }, [bookData, setValue]);

//   const onSubmit = async (formData) => {
//     const updatedData = {
//       ...formData,
//       oldPrice: Number(formData.oldPrice),
//       newPrice: Number(formData.newPrice),
//     };

//     try {
//       await updateBook({ id, updatedData }).unwrap();
//       Swal.fire('Updated!', 'Book updated successfully.', 'success');
//       navigate('/dashboard/manage-books');
//     } catch (err) {
//       console.error("Update failed:", err);
//       Swal.fire('Error', 'Failed to update book.', 'error');
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (isError) return <div>Error fetching book data.</div>;

//   return (
//     <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <InputField label="Title" name="title" register={register} />
//         <InputField label="Description" name="description" type="textarea" register={register} />
//         <SelectField
//           label="Category"
//           name="category"
//           options={[
//             { value: '', label: 'Choose A Category' },
//             { value: 'business', label: 'Business' },
//             { value: 'technology', label: 'Technology' },
//             { value: 'fiction', label: 'Fiction' },
//             { value: 'horror', label: 'Horror' },
//             { value: 'adventure', label: 'Adventure' },
//           ]}
//           register={register}
//         />
//         <div className="mb-4">
//           <label className="inline-flex items-center">
//             <input type="checkbox" {...register('trending')} className="rounded text-blue-600" />
//             <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
//           </label>
//         </div>
//         <InputField label="Old Price" name="oldPrice" type="number" register={register} />
//         <InputField label="New Price" name="newPrice" type="number" register={register} />
//         <InputField label="Cover Image URL" name="coverImage" type="text" register={register} />
//         <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
//           {isUpdating ? 'Updating...' : 'Update Book'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateBook;


import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useFetchBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const bookData = data?.book;

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (formData) => {
    const updatedData = {
      ...formData,
      oldPrice: Number(formData.oldPrice),
      newPrice: Number(formData.newPrice),
    };

    try {
      await updateBook({ id, ...updatedData }).unwrap(); // ✅ Correct spread
      Swal.fire('Updated!', 'Book updated successfully.', 'success');
      navigate('/'); // ✅ Go to Manage Books
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire('Error', 'Failed to update book.', 'error');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching book data.</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField label="Title" name="title" register={register} />
        <InputField label="Description" name="description" type="textarea" register={register} />
        <SelectField
          label="Category"
          name="category"
          options={[
            { value: '', label: 'Choose A Category' },
            { value: 'business', label: 'Business' },
            { value: 'technology', label: 'Technology' },
            { value: 'fiction', label: 'Fiction' },
            { value: 'horror', label: 'Horror' },
            { value: 'adventure', label: 'Adventure' },
          ]}
          register={register}
        />
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" {...register('trending')} className="rounded text-blue-600" />
            <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
          </label>
        </div>
        <InputField label="Old Price" name="oldPrice" type="number" register={register} />
        <InputField label="New Price" name="newPrice" type="number" register={register} />
        <InputField label="Cover Image URL" name="coverImage" type="text" register={register} />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          {isUpdating ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;

