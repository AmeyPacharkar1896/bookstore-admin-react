import theme from "../../theme/theme";

const navItems = [
  { label: "Products", path: "/admin/products", icon: "📚" },
  { label: "Orders", path: "/admin/orders", icon: "🧾" },
  { label: "Reviews", path: "/admin/reviews", icon: "⭐" },
  { label: "Users", path: "/admin/users", icon: "👥" },
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        backgroundColor: theme.colors.deepGreyBlue,
        color: theme.colors.navWhite,
        padding: "1.5rem 1rem",
        height: "100vh",
      }}
    >
      <div style={{ fontWeight: theme.fontWeight.bold, fontSize: "20px", marginBottom: "2rem" }}>
        Bookstore Admin
      </div>

      <nav>
        {navItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              marginBottom: "0.5rem",
              borderRadius: theme.borderRadius.button,
              backgroundColor: item.label === "Products" ? theme.colors.deepTeal : "transparent",
              color: theme.colors.navWhite,
              textDecoration: "none",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
