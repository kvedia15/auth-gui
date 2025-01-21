import { useEffect } from "react";
import { Optional } from "~/domain/results";

type LoginPageProps = {
  credentials: { username: string; password: string };
  error: Optional<string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => void;
};

export default function LoginPage({
  credentials,
  error,
  handleInputChange,
  handleLogin,
}: LoginPageProps) {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
