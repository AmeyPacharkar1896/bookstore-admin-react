import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import theme from "../../theme/theme";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const navItems = [
    { label: "Products", path: "/admin/products", icon: "📚" },
    { label: "Orders", path: "/admin/orders", icon: "🧾" },
    { label: "Reviews", path: "/admin/reviews", icon: "⭐" },
    { label: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <aside
      style={{
        width: "220px",
        background: theme.colors.deepGreyBlue,
        color: theme.colors.navWhite,
        display: "flex",
        flexDirection: "column",
        padding: "2rem 1rem",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: theme.fontSizes.h2,
            marginBottom: "2rem",
            fontWeight: theme.fontWeight.bold,
            color: theme.colors.navWhite,
          }}
        >
          Bookstore Admin
        </h2>

        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: theme.borderRadius.button,
                textDecoration: "none",
                backgroundColor: isActive ? theme.colors.deepTeal : "transparent",
                color: theme.colors.navWhite,
                fontWeight: isActive ? theme.fontWeight.semiBold : "normal",
                marginBottom: "0.5rem",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Logout button at the bottom */}
      <button
        onClick={() => {
          logout();
          navigate("/admin/login");
        }}
        style={{
          marginTop: "auto",
          marginBottom: "1rem",
          padding: "0.75rem 1rem",
          backgroundColor: "transparent",
          border: "none",
          color: theme.colors.errorRed,
          fontSize: theme.fontSizes.body,
          fontWeight: theme.fontWeight.semiBold,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        🚪 Logout
      </button>
    </aside>
  );
}
