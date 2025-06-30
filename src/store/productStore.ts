import { create } from "zustand";
import type { NewProduct, Product, UpdateProduct } from "../models/productModel";
import { productService } from "../services/productService";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchAllProducts: () => Promise<void>;
  addProduct: (newProduct: NewProduct) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateProduct: (productId: string, data: UpdateProduct) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchAllProducts: async () => {
    set({ loading: true, error: null });
    try {
      const all = await productService.getAllProducts();
      set({ products: all, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch products.", loading: false });
      console.error(err);
    }
  },

  addProduct: async (newProduct) => {
    set({ error: null }); // Clear any existing error
    try {
      const created = await productService.createProduct(newProduct);
      if (!created) throw new Error("No product returned from API");

      set((state) => ({
        products: [created, ...state.products], // Add to the top
      }));
    } catch (err) {
      console.error("Add product error:", err);
      set({ error: "Failed to add product." });
    }
  },

  deleteProduct: async (productId) => {
    try {
      await productService.deleteProduct(productId);
      set((state) => ({
        products: state.products.filter((p) => p.id !== productId),
      }));
    } catch (err) {
      console.error("Delete product error:", err);
      set({ error: "Failed to delete product." });
    }
  },

  updateProduct: async (productId, data) => {
    try {
      const updated = await productService.updateProduct(productId, data);
      set((state) => ({
        products: state.products.map((p) => (p.id === productId ? updated : p)),
      }));
    } catch (err) {
      console.error("Update product error:", err);
      set({ error: "Failed to update product." });
    }
  },
}));
