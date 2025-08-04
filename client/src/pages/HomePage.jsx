import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useMatchStore } from "../store/useMatchStore";
import Header from "../components/Header";

const HomePage = () => {
  const { isLoadingUserProfiles, getUserProfiles, userProfiles } =
    useMatchStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 overflow-hidden">
      <Sidebar />
      <div className="flex flex-grow flex-col overflow-hidden">
        <Header />
        <main className="flex flex-grow">

        </main>
      </div>
    </div>
  );
};

export default HomePage;
