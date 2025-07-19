import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useAuthStore();

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        login({ email, password });
      }}
    >
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
          className="block w-full appearance-none px-3 py-2 border border-pink-300 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-pink-600"
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
          className="block w-full appearance-none px-3 py-2 border border-pink-400 rounded-md outline-none shadow-sm placeholder-pink-400 focus:ring-pink-500 focus:border-pink-500 sm:text-sm text-pink-600 "
        />
      </div>

      <button
        type="submit"
        className={`w-full flex justify-center border border-transparent text-white py-2 rounded-md shadow-sm text-sm font-medium px-4 ${
          loading
            ? "bg-pink-400 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:outline-none focus:ring-offset-2 focus:ring-pink-500"
        }`}
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
