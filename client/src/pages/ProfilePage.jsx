import { useRef, useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser.name || "");
  const [bio, setBio] = useState(authUser.bio || "");
  const [age, setAge] = useState(authUser.age || "");
  const [gender, setGender] = useState(authUser.gender || "");
  const [genderPreference, setGenderPreference] = useState(
    authUser.genderPreference || []
  );
  const [image, setImage] = useState(authUser.image || null);

  const fileInputRef = useRef(null);

  const { loading, updateProfile } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ name, bio, age, gender, genderPreference, image });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">
            Your Profile
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-pink-400">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-pink-600"
              >
                Name
              </label>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full px-3 py-2 border border-pink-400 rounded-md shadow-sm placeholder-pink-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-pink-600 mt-2"
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-pink-600"
                >
                  Age
                </label>
                <div>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full px-3 py-2 border border-pink-400 rounded-md shadow-sm placeholder-pink-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-pink-600 mt-2"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-sm font-medium text-pink-600 mb-2">
                  Gender
                </span>
                <div className="flex space-x-4">
                  {["Male", "Female"].map((option) => {
                    return (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-pink-600"
                          name="gender"
                          value={option.toLowerCase()}
                          onChange={() => setGender(option.toLowerCase())}
                        />
                        <span className="ml-2 text-pink-600">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-sm font-medium text-pink-600 mb-2">
                  Gender Preference
                </span>
                <div className="flex space-x-4">
                  {["Male", "Female", "Both"].map((option) => {
                    return (
                      <label key={option} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-radio text-pink-600"
                          checked={
                            genderPreference.toLowerCase() ===
                            option.toLowerCase()
                          }
                          onChange={() =>
                            setGenderPreference(option.toLowerCase())
                          }
                        />
                        <span className="ml-2 text-pink-600">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <span className="block text-sm font-medium text-pink-600 mb-2">
                  Bio
                </span>
                <div className="flex space-x-4">
                  <textarea
                    name="bio"
                    id="bio"
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="block w-full px-3 py-2 border border-pink-400 rounded-md shadow-sm placeholder-pink-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-pink-600 "
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
