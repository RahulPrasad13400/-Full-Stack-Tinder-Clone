import { useEffect } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { messages } = useMessageStore();
  const { authUser } = useAuthStore();

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const { id } = useParams();

  const match = matches.find((m) => m._id === id);

  useEffect(() => {
    if (authUser) {
      getMyMatches();
    }
  }, [getMyMatches, authUser]);

  if(!match){
    return <div>Match not found</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-opacity-50">
      <Header />
      <div className="flex flex-grow flex-col p-4 md:p-6 lg:p-8 overflow-hidden max-w-4xl mx-auto w-full">
        <div className="flex items-center bg-white mb-4 rounded-lg shadow p-3">
          <img
            src={
              match.image ||
              "https://m.media-amazon.com/images/M/MV5BODE1ODE5MzY5M15BMl5BanBnXkFtZTgwNDg1NDA4NTM@._V1_FMjpg_UX1000_.jpg"
            }
            alt=""
            className="w-12 h-12 object-cover rounded-full mr-3 border-2 border-pink-400 p-0.5"
          />
          <h2 className="text-xl font-semibold text-gray-800">{match?.name}</h2>
        </div>
        <div className="flex-grow overflow-y-auto mb-4 bg-white rounded-lg shadow p-4">
          {messages.length === 0 ? (
            <>
              <p className="text-center text-gray-500">
                Start your conversation with {match?.name}
              </p>
            </>
          ) : (
            <>
              {messages.map((message) => {
                <div
                  key={message?._id}
                  className={`mb-3 ${
                    message?.sender === authUser?._id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block p-3 rounded-lg max-w-xs lg:max-w-md ${
                      message.sender === authUser._id
                        ? "bg-pink-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  ></span>
                </div>;
              })}
            </>
          )}
        </div>
        <div>MESSAGE INPUT</div>
      </div>
    </div>
  );
};

export default ChatPage;
