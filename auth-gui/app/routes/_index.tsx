import { type MetaFunction } from "@remix-run/node";
import { useAuthRepo } from "~/context/authContext";
import { useEffect, useState } from "react";
import { Optional } from "~/domain/results";
import LoginPage from "~/components/login/loginPage";
import Home from "~/components/home/home";
export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    { name: "description", content: "Login to manage users" },
  ];
};

export default function Index() {
  const { login, validateSession, logout, isLoggedIn } = useAuthRepo();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState<Optional<string>>(null);

  useEffect(() => {
    async function validateSessionAsync() {
      try {
        const user = await validateSession();
        setCredentials((prev) => ({ ...prev, username: user?.Username ?? "" }));
      } catch (error) {
        console.error(error);
      }
    }
    validateSessionAsync();
  }, []);


  const handleLogin = async () => {
    try {
      const user = await login(credentials.username, credentials.password);
      setCredentials((prev) => ({ ...prev, username: user?.Username ?? "" }));
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      setError(null);
      setCredentials({ username: "", password: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  if (isLoggedIn) {
    return (
      <Home credentials={credentials} handleLogout={handleLogout}></Home>
    );
  }
  return (
    <LoginPage credentials={credentials} error={error} handleInputChange={handleInputChange} handleLogin={handleLogin}></LoginPage>
  );
}
