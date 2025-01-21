import Sidebar from "../sidebar/sidebar";

type HomeProps = {
    credentials: { username: string };
    handleLogout: () => void;
  };
  
  export default function Home({ credentials, handleLogout }: HomeProps) {
    return (
      <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <Sidebar handleLogout={handleLogout} />
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-gray-300 mb-6">
              You are logged in as{" "}
              <span className="font-semibold text-indigo-400">
                {credentials.username}
              </span>
            </p>
          </div>
        </main>
      </div>
    );
  }