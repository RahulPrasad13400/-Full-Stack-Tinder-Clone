import { useState } from "react";
import { Heart, Loader, X } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const loading = false;
  const matches = [{ _id: 1, name: "binu" }];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-10 bg-white w-64 shadow-md overflow-hidden transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-1/4`}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 pb-[27px] border-b border-pink-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-600">Matches</h2>
          <button
            className="lg:hidden p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-grow overflow-y-auto p-4 z-10 relative">
          {loading ? (
            <LoadingState />
          ) : matches.length === 0 ? (
            <NoMatchesFound />
          ) : (
            matches.map((match) => (
              <Link key={match._id} to={`/chat/${match._id}`}>
                <div className="flex items-center mb-4 cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors duration-300">
                  <img src={match.image ||'../../public/eleven.webp'} alt="User avatar" className="size-12 object-cover rounded-full mr-2 border-1 p-0.5 border-pink-600" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const NoMatchesFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Heart className="text-pink-400 mb-4" size={48} />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No Matches yet
      </h3>
      <p className="text-gray-500 max-w-xs">
        Don't worry! your perfect match is just around the corner. keep swiping
      </p>
    </div>
  );
};

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Loader className="text-pink-500 mb-4 animate-spin" size={48} />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        Loading Matches
      </h3>
      <p className="text-gray-500 max-w-xs">
        We are finding your perfect matches. This might take a moment...
      </p>
    </div>
  );
};
