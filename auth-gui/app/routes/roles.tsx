import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import Sidebar from "~/components/sidebar/sidebar"
import { useAuthRepo } from "~/context/authContext";
import { Optional } from "~/domain/results";




export default function Roles() { 
  const { logout, validateSession } = useAuthRepo();
  const [error, setError] = useState<Optional<string>>(null);
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Optional<string[]>>(null);
  // Navigate to specific path

  useEffect(() => {
    async function validateSessionAsync() {
      try {
        const user = await validateSession();
      } catch (error) {
        console.error(error);
      }
    }
    validateSessionAsync();
  }, []);
    const handleLogout = async () => {
        try {
          await logout();
          setError(null);
          navigate('/')
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      }

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <Sidebar handleLogout={handleLogout} />
        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-4">Roles</h1>
          </div>
        </main>
      </div>
    );
}