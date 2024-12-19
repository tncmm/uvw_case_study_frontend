import React from "react";
import { useRouter } from "next/router";
import { clearToken } from "@/utils/token";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks/hooks";

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    if (user) {
      dispatch({ type: "RESET" });
      clearToken();
      localStorage.clear();
      console.log("User logged out");
      router.push("/auth/login");
    } else {
      router.push("/auth/login");
    }
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
          {user && (
            <div className="flex space-x-4">
              <button
                onClick={() => router.push("/posts/create")}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Create Post
              </button>
              <button
                onClick={() => router.push(`/user/${user.id}`)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Profile
              </button>
            </div>
          )}

          {/* Right Section - Login/Logout */}
          <div>
            <button
              onClick={handleLogout}
              className={`text-white px-4 py-2 rounded-md text-sm font-medium ${
                user
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
