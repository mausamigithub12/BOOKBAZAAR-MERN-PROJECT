import React from 'react';

const Failure = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl text-red-600 font-bold">❌ Payment Failed</h2>
      <p>Please try again or use another payment method.</p>
    </div>
  );
};

export default Failure;
