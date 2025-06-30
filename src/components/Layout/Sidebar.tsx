import { useLocation, NavLink } from "react-router-dom";
import theme from "../../theme/theme";

export default function Sidebar() {
  const location = useLocation();

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
        gap: "1rem",
      }}
    >
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
              color: isActive ? theme.colors.navWhite : theme.colors.navWhite,
              fontWeight: isActive ? theme.fontWeight.semiBold : "normal",
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}
