"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { data } from "../data";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const user =
      data.logins.username === email && data.logins.password === password;

    if (user) {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-2xl p-12 space-y-10 bg-white shadow-2xl rounded-3xl">
        <div>
          <h2 className="text-5xl font-extrabold text-center text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-4 text-xl text-center text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email-address"
                className="block text-lg font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                required
                className="block w-full px-4 py-3 mt-2 text-gray-900 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-4 py-3 mt-2 text-gray-900 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-lg text-center text-red-500 font-semibold">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-6 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
