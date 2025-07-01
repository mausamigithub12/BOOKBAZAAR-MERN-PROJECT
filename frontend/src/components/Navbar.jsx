import React, { useState } from "react";
import { href, Link } from "react-router-dom";
import {
  HiMiniBars3CenterLeft,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png"

const navigation = [
  {name:"Dashboard", href:"/dashboard"},
  {name:"Orders", href:"/orders"},
  {name:"Cart Page", href:"/cart"},
  {name:"Check Out", href:"/checkout"},
]

function Navbar() {
  const currentUser = false;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  console.log(isDropdownOpen)

  return (
    <header className="max-w-screen-2xl mx-auto px-10 py-6">
      <nav className="flex justify-between  items-center">
        {/*Left side*/}

        <div className=" flex items-center gap-4 md:gap-16">
          <Link to="/">
            <HiMiniBars3CenterLeft className=" size-6" />
          </Link>

          {/* Search Input */}
          <div className=" relative sm:w-72 w-40 left-7 ">
            <IoSearchOutline className=" absolute inline-block left-2 inset-y-2.5" />
            <input
              type="text"
              placeholder="search here"
              className="bg-tertary w-full  py-1 md:px-8 px-7 rounded-md outline-none"
            />
          </div>
        </div>

        {/*Right side*/}
        <div className=" relative flex items-center gap-3">
          <div>
            {
              currentUser ? <>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img src={avatarImg} alt="avatar img" className={`size-7 rounded-full ${currentUser? 'ring-2 ring-blue-500' : ''}`}/>
              </button>
              {/* show dropdown */}
              {
                isDropdownOpen &&(

                
                <div className=" absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2 ">
                    {
                      navigation.map((item) =>(
                        <li key={item.name} onClick={()=> setIsDropdownOpen(false)}>
                          <Link to={item.href} className=" block px-4 py-2 text-sm hover:bg-gray-200">
                          {item.name}</Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                )
              }
              </>:<Link to="/login"><HiOutlineUser className="size-6" /></Link>

            }
          </div>
          <button className=" hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link to="/cart" className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm ">
            <HiOutlineShoppingCart className="" />
            <span className=" text-sm font-semibold sm:ml-1">0</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
