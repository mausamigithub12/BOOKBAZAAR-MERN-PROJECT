// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
// } from "react-router-dom";
// import App from "../App";
// import Home from "../pages/home/Home";
// import Login from "../components/Login";
// import Register from "../components/Register";
// import CartPage from "../pages/books/CartPage";
// import CheckoutPage from "../pages/books/CheckoutPage";
// import PrivateRoute from "./PrivateRoute";
// import SingleBook from "../pages/books/SingleBook";
// import OrderPage from "../pages/books/OrderPage";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/user-dashboard" element={<h1>Dashboard</h1>} />
//       <Route path="/orders" element={<PrivateRoute><OrderPage/></PrivateRoute>} />
//       {/* <Route path="/cart" element={<h1>Cart Page</h1>} /> */}
//       {/* <Route path="/checkout" element={<h1>Check Out</h1>} /> */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register/>}/>
//       <Route path="/cart" element={<CartPage/>}/>
//       <Route path="/books/:id" element={<SingleBook/>}/>
//       <Route path="/checkout" element={<PrivateRoute>  <CheckoutPage/></PrivateRoute> }/>
//     </Route>
//   )
// );
// export default router;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "../pages/books/SingleBook";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";

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
        <Route path="/about" element={<div>About</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
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


