import React from 'react';
import { useGetAllOrdersQuery } from '../../../redux/features/orders/ordersApi';
import Loading from '../../../components/Loading';

const PaymentReports = () => {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();

  const completedPayments = orders?.filter(order => order.paymentStatus === 'COMPLETE') || [];

  if (isLoading) return <Loading />;
  if (isError) return <div className="p-6 text-red-500">Error loading payment reports</div>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Payment Reports</h1>
      
     

      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedPayments.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{order._id.slice(-8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">Rs. {order.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{order.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {completedPayments.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Date</p>
                <p className="text-sm text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="text-sm text-gray-800 font-mono">{order._id.slice(-8)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Method</p>
                <p className="text-sm text-gray-800 capitalize">{order.paymentMethod}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-500">User</p>
              <p className="text-sm text-gray-800 truncate">{order.email}</p>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500">Amount</p>
              <p className="text-lg font-bold text-green-600">Rs. {order.totalPrice}</p>
            </div>
          </div>
        ))}
      </div>

      {completedPayments.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Payment Records</h3>
          <p className="text-gray-500">No completed payments found in the system.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentReports;