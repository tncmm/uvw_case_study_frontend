import React from "react";
import { useRouter } from "next/router";
import { clearToken } from "@/utils/token";
import { useDispatch } from 'react-redux';
import { useAppSelector } from "@/redux/hooks/hooks";


const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch({ type: 'RESET' });
    clearToken()
    // Clear any stored session (localStorage, redux state, etc.)
    localStorage.clear();
    console.log("User logged out");

    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex-shrink-0">
            <h1
              className="text-xl font-bold text-blue-600 cursor-pointer"
              onClick={() => router.push("/")}
            >
              Bloggr
            </h1>
          </div>

          {/* Center Links */}
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/posts/create")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Create Post
            </button>
            <button
              onClick={() => router.push(`/user/${user?.id}`)}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Profile
            </button>
          </div>

          {/* Right Section - Logout */}
          <div>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
