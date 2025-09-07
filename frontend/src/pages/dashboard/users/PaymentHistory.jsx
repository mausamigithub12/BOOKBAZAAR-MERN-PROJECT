
import React from 'react';
import { useGetOrderByEmailQuery } from '../../../redux/features/orders/ordersApi';
import { useAuth } from '../../../context/AuthContext';

const PaymentHistory = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading, error } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) {
    return <div className="text-center p-8">Loading payment history...</div>;
  }

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center text-red-500">
        Error loading payment history: {error.message}
      </div>
    );
  }

  const paymentHistory = Array.isArray(orders) 
    ? orders.map(order => ({
        id: order._id,
        date: new Date(order.createdAt).toLocaleDateString(),
        amount: order.totalPrice,
        method: order.paymentMethod,
        status: order.paymentStatus,
      }))
    : [];

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      
      {paymentHistory.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">No payment history found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="hidden md:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rs. {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === "COMPLETE" 
                          ? "bg-green-100 text-green-800" 
                          : payment.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Date: {payment.date}</p>
                    <p className="text-xs text-gray-500">ID: {payment.id.slice(-6)}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === "COMPLETE" 
                      ? "bg-green-100 text-green-800" 
                      : payment.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {payment.status}
                  </span>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Method:</span> {payment.method}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Rs. {payment.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;