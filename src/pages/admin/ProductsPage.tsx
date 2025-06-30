import { useEffect } from "react";
import ProductTable from "../../components/Product/ProductTable";
import Sidebar from "../../components/Layout/Sidebar";
import { useProductStore } from "../../store/productStore";
import Header from "../../components/Layout/Header";
import theme from "../../theme/theme";

export default function ProductsPage() {
  const fetchAllProducts = useProductStore((s) => s.fetchAllProducts);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: theme.colors.adminCanvasGrey }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header title="Product Management" />
        <main style={{ padding: "1.5rem", overflowY: "auto" }}>
          <ProductTable />
        </main>
      </div>
    </div>
  );
}
