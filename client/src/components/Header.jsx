import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Flame, User, LogOut, Menu } from 'lucide-react'

function Header() {
  const { authUser, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center space-x-2">
          <Flame className='w-8 h-8 text-white hidden sm:inline' />
            <span>Tinder</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
            {/* {authUser ? ( */}
                <div className="relative" ref={dropdownRef}>
                    <button onClick={()=>{
                        setDropdownOpen(!dropdownOpen)
                    }} className="flex items-center space-x-2 focus:outline-none">
                        <img className="w-10 h-10 object-cover border-2 rounded-full" src={authUser?.image || "https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?semt=ais_hybrid&w=740"} alt="User Image" />
                    </button>
                </div>
            {/* ) : (  */}
                {/* <>
                </> */}
            {/* )}  */}
        </div>
      </div>
    </div>
  );
}

export default Header;
