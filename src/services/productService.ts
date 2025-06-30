import { supabase } from "../utils/supabaseClient";
import type { Product } from "../models/productModel";

export const productService = {
  // Fetch all products
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Product[];
  },

  // Fetch product by ID
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data as Product;
  },

  // Create new product — returns the created product
  async createProduct(
    product: Omit<Product, "id" | "created_at">
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  // Update existing product — returns updated product
  async updateProduct(
    id: string,
    product: Partial<Product>
  ): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Product;
  },

  // Delete product by ID
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};
