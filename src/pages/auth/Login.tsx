import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import theme from "../../theme/theme";
import { authService } from "../../services/authService";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/products" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authService.signInWithEmail(email, password);

      if (useAuthStore.getState().user?.role === 'admin') {
        navigate("/admin/dashboard");
      } else {
        setError("You are not authorized to access this portal.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: theme.colors.adminCanvasGrey }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: theme.colors.cleanPageWhite,
          padding: "2rem",
          borderRadius: theme.borderRadius.card,
          boxShadow: theme.boxShadow.medium,
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Optional Logo */}
        {/* <img src="/logo.svg" alt="App Logo" className="mx-auto h-12 w-auto mb-4" /> */}

        <h1
          className="text-center mb-1"
          style={{
            fontSize: theme.fontSizes.h1,
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.adminInk,
            fontFamily: "Open Sans",
          }}
        >
          Admin Login
        </h1>

        <p
          className="text-center mb-6"
          style={{
            fontSize: theme.fontSizes.body,
            color: theme.colors.subtleGrey,
            fontFamily: "Open Sans",
          }}
        >
          Access the Bookstore Management Portal
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: theme.fontSizes.body,
              fontWeight: theme.fontWeight.semiBold,
              marginBottom: "0.25rem",
              color: theme.colors.adminInk,
              fontFamily: "Open Sans",
            }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${theme.colors.subtleGrey}`,
              borderRadius: theme.borderRadius.input,
              fontSize: theme.fontSizes.body,
              fontFamily: "Open Sans",
              color: theme.colors.adminInk,
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = `2px solid ${theme.colors.deepTeal}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = `1px solid ${theme.colors.subtleGrey}`;
            }}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            style={{
              display: "block",
              fontSize: theme.fontSizes.body,
              fontWeight: theme.fontWeight.semiBold,
              marginBottom: "0.25rem",
              color: theme.colors.adminInk,
              fontFamily: "Open Sans",
            }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: `1px solid ${theme.colors.subtleGrey}`,
              borderRadius: theme.borderRadius.input,
              fontSize: theme.fontSizes.body,
              fontFamily: "Open Sans",
              color: theme.colors.adminInk,
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = `2px solid ${theme.colors.deepTeal}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = `1px solid ${theme.colors.subtleGrey}`;
            }}
          />
        </div>

        {error && (
          <p
            style={{
              fontSize: theme.fontSizes.sm,
              color: theme.colors.errorRed,
              fontFamily: "Open Sans",
              textAlign: "center",
              marginBottom: "0.75rem",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: theme.colors.deepTeal,
            color: theme.colors.navWhite,
            fontSize: theme.fontSizes.h3,
            fontWeight: theme.fontWeight.semiBold,
            padding: "0.75rem",
            borderRadius: theme.borderRadius.button,
            fontFamily: "Open Sans",
            opacity: loading ? 0.5 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s",
          }}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <a
            href="#"
            style={{
              fontSize: theme.fontSizes.sm,
              color: theme.colors.subtleGrey,
              fontFamily: "Open Sans",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.colors.deepTeal;
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.colors.subtleGrey;
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
