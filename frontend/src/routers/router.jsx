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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      <Route path="/orders" element={<h1>Orders</h1>} />
      {/* <Route path="/cart" element={<h1>Cart Page</h1>} /> */}
      {/* <Route path="/checkout" element={<h1>Check Out</h1>} /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/checkout" element={ <CheckoutPage/> }/>
    </Route>
  )
);
export default router;
