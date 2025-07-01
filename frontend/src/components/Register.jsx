import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";


function Register() {
    const[ show, setShow] = useState(true)
    const TooglePassword = () =>{
        setShow(!show)
    }
  return (
    <div className=" h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        <form>
          <div>
            <label
              htmlFor="email"
              className=" block text-gray-700 text-sm font-bold mb-2"
            >
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              name="email"
              id="email placeholder='Email Address'"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={show ? "password" : Text}
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow relative"
            />
             {/* Eye toggle icon */}
             <div className=" absolute ml-[290px] -mt-7 cursor-pointer">
                {
                    show?   <BsEye onClick={TooglePassword} /> : <BsEyeSlash onClick={TooglePassword} />
                }
             </div>
           
           
           </div>

          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none cursor-pointer">
              Register
            </button>
          </div>
        </form>
        
        <p className="align-baseline font-medium mt-4 text-sm">
          Have an account? Please 
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* google sign in */}
        <div className="mt-4">
          <button className="w-full flex flex-wrap gap-2 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline-none cursor-pointer">
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
