import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await authService.singInWithEmail(email, password);
      const user = await authService.getCurrentUser();

      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        setError("Access denied: Admins only.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[--color-soft-page-white]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-[--color-ink-black]">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-[--color-light-mist-grey] rounded mb-4 focus:outline-none focus:border-2 focus:border-[--color-deep-teal]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-[--color-light-mist-grey] rounded mb-4 focus:outline-none focus:border-2 focus:border-[--color-deep-teal]"
        />

        {error && <p className="text-sm text-[--color-error-red] mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[--color-deep-teal] text-[--color-soft-page-white] py-2 rounded hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
