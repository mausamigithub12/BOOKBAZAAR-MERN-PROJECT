// import React, { useEffect } from 'react';
// import { useGetAdminStatsQuery } from '../../../redux/adminStatsApi';
// import StatsCard from '../StatsCard';
// import SalesChart from './SalesChart';
// import Loading from '../../../components/Loading';

// const AdminStats = () => {
//   const { data, isLoading, isError, refetch } = useGetAdminStatsQuery();

//   useEffect(() => {
//     refetch();
//   }, [refetch]);

//   if (isLoading) return <Loading />;
//   if (isError) return <div className="text-red-600">Error loading stats</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <StatsCard icon="books" title="Total Books" value={data?.totalBooks || 0} color="blue" />
//         <StatsCard icon="orders" title="Total Orders" value={data?.totalOrders || 0} color="green" />
//         <StatsCard icon="users" title="Total Users" value={data?.totalUsers || 0} color="orange" />
//         <StatsCard icon="sales" title="Total Sales" value={`Rs. ${data?.totalSales?.toFixed(2) || 0}`} color="purple" />
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
//         <SalesChart />
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Trending Books</h2>
//         {data?.trendingBooks?.length > 0 ? (
//           <div className="space-y-2">
//             {data.trendingBooks.map((book, index) => (
//               <div key={index} className="flex justify-between items-center p-3 border-b">
//                 <span className="font-medium">{book.title}</span>
//                 <span className="text-gray-600">{book.count} orders</span>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No trending books data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminStats;
