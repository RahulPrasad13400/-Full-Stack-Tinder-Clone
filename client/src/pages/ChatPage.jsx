import { useEffect } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";

const ChatPage = () => {
  const { messages, getMessages, subscribeToMessages, unsubscribeToMessages } =
    useMessageStore();
  const { authUser } = useAuthStore();

  const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
  const { id } = useParams();

  console.log("messages array : ", messages)

  const match = matches.find((m) => m._id === id);

  useEffect(() => {
    if (authUser && id) {
      getMyMatches();
      getMessages(id);
      subscribeToMessages();
    }
    return () => unsubscribeToMessages();
  }, [
    getMyMatches,
    authUser,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
    id,
  ]);

  if (isLoadingMyMatches) {
    return <LoadingMessagesUI />;
  }

  if (!match) {
    return <MatchNotFound />;
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
                return <div
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
                  >
                    {message?.content}
                  </span>
                </div>;
              })}
            </>
          )}
        </div>
        <div>
          <MessageInput match={match} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

const MatchNotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50 bg-dot-pattern">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <UserX size={64} className="mx-auto text-pink-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Match Not Found
      </h2>
      <p className="text-gray-600">
        Oops! It seems this match doesn&apos;t exist or has been removed.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors 
				focus:outline-none focus:ring-2 focus:ring-pink-300 inline-block"
      >
        Go Back To Home
      </Link>
    </div>
  </div>
);

const LoadingMessagesUI = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-100 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <Loader size={48} className="mx-auto text-pink-500 animate-spin mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Loading Chat
      </h2>
      <p className="text-gray-600">
        Please wait while we fetch your conversation...
      </p>
      <div className="mt-6 flex justify-center space-x-2">
        <div
          className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  </div>
);
