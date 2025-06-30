export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  product_type: "physical" | "digital";
  cover_url: string;
  created_at: string; // ISO timestamp
}

// For creation form – don't need id or created_at
export type NewProduct = Omit<Product, "id" | "created_at">;

// For update form – partial because user might only change a few fields
export type UpdateProduct = Partial<Omit<Product, "id" | "created_at">>;
