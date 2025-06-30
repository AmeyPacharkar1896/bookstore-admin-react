import { useNavigate } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import theme from "../../theme/theme";


export default function ProductTable() {
  const navigate = useNavigate();
  const products = useProductStore((s) => s.products);

  return (
    <div
      style={{
        backgroundColor: theme.colors.cleanPageWhite,
        borderRadius: theme.borderRadius.card,
        padding: "1.5rem",
        boxShadow: theme.boxShadow.subtle,
        border: `1px solid ${theme.colors.subtleGrey}`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2
          style={{
            fontSize: theme.fontSizes.h3,
            fontWeight: theme.fontWeight.semiBold,
            color: theme.colors.adminInk,
          }}
        >
          All Products
        </h2>
        <a
          href="/admin/products/new"
          style={{
            backgroundColor: theme.colors.deepTeal,
            color: theme.colors.navWhite,
            padding: "8px 16px",
            borderRadius: theme.borderRadius.button,
            fontWeight: theme.fontWeight.semiBold,
            textDecoration: "none",
          }}
        >
          + Add New Product
        </a>
      </div>

      {products.length === 0 ? (
        <div style={{
          padding: "1rem",
          fontSize: theme.fontSizes.sm,
          color: theme.colors.subtleGrey,
          textAlign: "center"
        }}>
          No products found. Start by adding one.
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Author</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.id}
                style={{
                  backgroundColor: i % 2 === 0 ? theme.colors.cleanPageWhite : "#F8F8F8",
                }}
              >
                <td style={tableCellStyle}>{product.title}</td>
                <td style={tableCellStyle}>{product.author}</td>
                <td style={tableCellStyle}>₹{new Intl.NumberFormat("en-IN").format(product.price)}</td>
                <td style={{ ...tableCellStyle, textAlign: "right" }}>
                  <button
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    style={{
                      color: theme.colors.deepTeal,
                      marginRight: "1rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => alert("Delete logic pending")}
                    style={{ color: theme.colors.errorRed, background: "none", border: "none" }}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  textAlign: "left" as const,
  padding: "0.75rem",
  color: theme.colors.adminInk,
  fontSize: theme.fontSizes.h3,
  fontWeight: theme.fontWeight.semiBold,
  borderBottom: `1px solid ${theme.colors.subtleGrey}`,
};

const tableCellStyle = {
  padding: "0.75rem",
  color: theme.colors.adminInk,
  fontSize: theme.fontSizes.body,
};
