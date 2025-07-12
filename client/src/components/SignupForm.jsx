import React, { useState } from "react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  const signup = () => {
    alert("signup");
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
    >
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-pink-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full appearance-none px-3 py-2 border border-pink-300 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-pink-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full appearance-none px-3 py-2 border border-pink-300 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-pink-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full appearance-none px-3 py-2 border border-pink-300 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-pink-700"
        >
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          placeholder="Age"
          required={true}
          value={age}
          min={18}
          max={120}
          onChange={(e) => setAge(e.target.value)}
          className="block w-full appearance-none px-3 py-2 border border-pink-300 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="gender"
          className="block text-sm font-medium text-pink-700"
        >
          Gender
        </label>
        <div className="flex gap-2">
          <div className="flex items-center">
            <input
              id="male"
              name="gender"
              type="checkbox"
              checked={gender === "male"}
              onChange={() => setGender("male")}
              className="h-4 w-4 accent-pink-600 focus:ring-pink-500 border-pink-300 rounded"
            />
            <label htmlFor="" className="ml-2 block text-sm text-pink-500">
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="female"
              name="gender"
              type="checkbox"
              checked={gender === "female"}
              onChange={() => setGender("female")}
              className="h-4 w-4 accent-pink-600 focus:ring-pink-500 border-pink-300 rounded"
            />
            <label htmlFor="" className="ml-2 block text-sm text-pink-500">
              Female
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-pink-700"
        >
          Prefer Me
        </label>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-1.5">
            <input
              type="radio"
              id="prefer-male"
              name="gender-preference"
              value={"male"}
              checked={genderPreference === "male"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 accent-pink-600 focus:ring-pink-500 border-pink-300"
            />
            <label
              htmlFor="prefer-male"
              className="text-sm text-pink-500 text-center"
            >
              Male
            </label>
          </div>
          <div className="flex items-center space-x-1.5">
            <input
              type="radio"
              id="prefer-female"
              name="gender-preference"
              value={"female"}
              checked={genderPreference === "female"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 accent-pink-600 focus:ring-pink-500 border-pink-300"
            />
            <label
              htmlFor="prefer-female"
              className="text-sm text-pink-500 text-center"
            >
              Female
            </label>
          </div>
          <div className="flex items-center space-x-1.5">
            <input
              type="radio"
              id="prefer-both"
              name="gender-preference"
              value={"both"}
              checked={genderPreference === "both"}
              onChange={(e) => setGenderPreference(e.target.value)}
              className="h-4 w-4 accent-pink-600 focus:ring-pink-500 border-pink-300"
            />
            <label
              htmlFor="prefer-both"
              className="text-sm text-pink-500 text-center"
            >
              Both
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
