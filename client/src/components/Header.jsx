import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu } from "lucide-react";

function Header() {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between py-2">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-white hidden sm:inline" />
            <span className="text-white font-medium">Tinder</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {authUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                }}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  className="w-10 h-10 object-cover border-2 rounded-full"
                  src={
                    authUser?.image ||
                    "https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740"
                  }
                  alt="User Image"
                />
                <span className="text-white font-medium">{authUser.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    to={`/profile`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User className="mr-2" size={16} />
                    Profile
                  </Link>
                  <button
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={logout}
                  >
                    <LogOut className="mr-2" size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to={"/auth"}
                className="text-white hover:text-pink-200 transition duration-150 ease-in-out"
              >
                Login
              </Link>
              <Link
                to={"/auth"}
                className="bg-white text-pink-600 px-4 py-2 rounded-full font-medium hover:bg-pink-100 transition duration-150 ease-in-out"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-pink-600">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700"
                  onClick={()=>setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <button className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-pink-700">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
