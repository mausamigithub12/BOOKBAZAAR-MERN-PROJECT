import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

import { 
  HiOutlineHeart, 
  HiOutlineShoppingCart, 
  HiOutlineMenu,
  HiOutlineX 
} from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import Img from "../assets/navLogo.png";
import backgroundImage from "../assets/backgroundImg.jpg";

const userNavigation = [
  { name: "My Profile", href: "/profile" },
  { name: "Dashboard", href: "/user-dashboard" },
];

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "View Orders", href: "/orders" },
  { name: "Manage Books", href: "/dashboard/manage-books" },
  { name: "Add Book", href: "/dashboard/add-new-book" },
];

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const getUserInitials = (full = "") => {
    if (!full) return "";
    const parts = full.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded?.role === "admin") {
          setAdminData(decoded);
        }
      } catch (err) {
        console.error("Invalid admin token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = async () => {
    if (adminData) {
      localStorage.removeItem("token");
      setAdminData(null);
      setIsDropdownOpen(false);
      navigate("/");
    } else {
      await logout();
      setIsDropdownOpen(false);
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    alert(`Searching for "${query}" - add your logic!`);
    setQuery("");
    setIsSearchExpanded(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const renderProfile = () => {
    if (currentUser) {
      const name = currentUser.fullName || currentUser.displayName || currentUser.email;
      return {
        initials: getUserInitials(name),
        email: currentUser.email,
        isAdmin: false,
      };
    } else if (adminData) {
      return {
        initials: getUserInitials(adminData.email),
        email: adminData.email,
        isAdmin: true,
      };
    }
    return null;
  };

  const profile = renderProfile();
  const isAdmin = profile?.isAdmin;

  return (
    <header
      className="w-full px-4 py-4 md:px-6 lg:px-10 md:py-6 text-white relative"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "96px" }}
    >
      <nav className="flex justify-between items-center">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
          
          <Link to="/" className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center">
            <img src={Img} alt="logo" className="rounded-full object-cover w-full h-full" />
          </Link>

          <div className="hidden md:flex gap-6  lg:gap-12 lg:px-28  font-semibold text-white">
            <Link to="/" className="hover:text-primary transition-colors duration-200">Home</Link>
            <Link to="/about" className="hover:text-primary transition-colors duration-200">About Us</Link>
            {/* <Link to="/contact" className="hover:text-primary transition-colors duration-200">Contact Us</Link> */}
          </div>
        </div>

        <div className="hidden md:flex relative w-72 ml-2">
          <IoSearchOutline
            onClick={handleSearch}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white text-black w-full py-1 md:px-8 px-7 rounded-md outline-none pl-8 pr-2"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-5 text-white">
          <button 
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
            aria-label="Search"
          >
            <IoSearchOutline className="w-6 h-6" />
          </button>

          <div className="relative">
            {profile ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex flex-col items-center focus:outline-none"
                  aria-label="User menu"
                >
                  <div className="bg-blue-600 text-white w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-lg font-semibold select-none">
                    {profile.initials}
                  </div>
                  <span className="hidden md:block text-xs mt-1 lowercase select-text max-w-[120px] truncate text-center">
                    {profile.email}
                  </span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-md shadow-lg text-black z-50">
                    <ul>
                      {(isAdmin ? adminNavigation : userNavigation).map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-200"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-white font-semibold hover:text-primary transition-colors duration-200 text-sm md:text-base">
                  Login
                </Link>
                <span className="text-white hidden sm:inline">|</span>
                <Link to="/register" className="text-white font-semibold hover:text-primary transition-colors duration-200 text-sm md:text-base">
                  Register
                </Link>
              </div>
            )}
          </div>

          <button title="Wishlist" className="hidden sm:block hover:text-primary transition-colors duration-200" aria-label="Wishlist">
            <HiOutlineHeart className="w-6 h-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-2 flex items-center rounded-md hover:bg-blue-700 transition-colors duration-200 relative"
            aria-label="Cart"
          >
            <HiOutlineShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {isSearchExpanded && (
        <div className="mt-4 md:hidden">
          <div className="relative">
            <IoSearchOutline
              onClick={handleSearch}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-white text-black w-full py-2 px-8 rounded-md outline-none"
              autoFocus
            />
            <button 
              onClick={() => setIsSearchExpanded(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <HiOutlineX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 bg-opacity-95 z-40 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-white font-semibold hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-white font-semibold hover:text-primary transition-colors duration-200 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
           
            
            <button 
              className="text-white font-semibold hover:text-primary transition-colors duration-200 py-2 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineHeart className="w-5 h-5 mr-2" />
              Wishlist
            </button>
            
            {!profile && (
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <Link 
                  to="/login" 
                  className="text-white font-semibold hover:text-primary transition-colors duration-200 py-2 text-center bg-blue-600 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-white font-semibold hover:text-primary transition-colors duration-200 py-2 text-center border border-white rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;