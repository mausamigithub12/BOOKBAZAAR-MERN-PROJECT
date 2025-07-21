

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
// import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "../pages/books/SingleBook";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "../routers/AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import LoginChoice from "../components/LoginChoice";
import UserLogin from "../components/UserLogin";
import PasswordInput from "../pages/PasswordInput";
// import OrderSuccessPage from "../pages/OrderSuccessPage";
// import PaymentFailedPage from "../pages/PaymentFailedPage";
import Success from "../components/Success";
import Failure from "../components/Failure";
import PaymentForm from "../components/PaymentForm";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Main layout */}
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />



        <Route path="/password" element={<PasswordInput />} />
        {/* <Route path="/order-success/:id" element={<OrderSuccessPage/>} /> */}
        {/* <Route path="/payment-failed" element={<PaymentFailedPage />} /> */}
        <Route path="/login" element={<LoginChoice />} />
<Route path="/login/user" element={<UserLogin />} />
{/* <Route path="/login/admin" element={<AdminLogin />} /> */}

        <Route path="/about" element={<div>About</div>} />
       
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />

      <Route path='/payment' element={<PaymentForm/>}/>
    <Route path='/payment-success' element={<Success/>}/>
    <Route path='/payment-failure' element={<Failure/>}/>
  
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Admin login route (outside layout) */}
      <Route path="/admin" element={<AdminLogin />} />

      {/* Admin dashboard layout and protected routes */}
       <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route
          index
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        /> 
        <Route
          path="add-new-book"
          element={
            <AdminRoute>
              <AddBook />
            </AdminRoute>
          }
        />
        <Route
          path="edit-book/:id"
          element={
            <AdminRoute>
              <UpdateBook />
            </AdminRoute>
          }
        />
        <Route
          path="manage-books"
          element={
            <AdminRoute>
              <ManageBooks />
            </AdminRoute>
          }
        />
      </Route> 
    </>
  )
);

export default router;


