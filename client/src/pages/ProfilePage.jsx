import { useRef, useState } from "react";
import Header from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
  const { authUser, checkAuth } = useAuthStore();

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

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }
  }

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
              <div className="space-y-2 mt-4">
                <div>
                  <button
                    className="border border-pink-600 px-2 py-1 rounded-md shadow-sm font-medium text-pink-600 text-sm bg-white hover:bg-pink-600 hover:text-white transition duration-700 items-center focus:outline-none hover:-translate-y-0.5 active:scale-95"
                    type="button"
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                  >
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              {image && (
                <div className="mt-4">
                  <img
                    src={image}
                    alt="User Image"
                    className="w-48 h-full object-cover rounded-md"
                  />
                </div>
              )}
              <button type='submit' className="bg-pink-600 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-pink-700 focus:outline-none mt-4" disabled={loading}>
                {loading ? "Saving.." : 'Save'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
