import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../store/productStore";
import theme from "../../theme/theme";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

export default function AddProduct({ isEdit = false }: { isEdit?: boolean }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addProduct, updateProduct, fetchProductById, selectedProduct } = useProductStore();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState<"physical" | "digital">("physical");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = "This field is required.";
    if (!author) newErrors.author = "This field is required.";
    if (!price || isNaN(Number(price))) newErrors.price = "Must be a valid number.";
    if (!imagePreview && !imageFile) newErrors.image = "Please upload an image.";
    return newErrors;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      let cover_url = imagePreview || "";
      if (imageFile) {
        cover_url = await uploadToCloudinary(imageFile);
      }

      const payload = {
        title,
        author,
        price: Number(price),
        product_type: productType,
        cover_url,
      };

      if (isEdit && id) {
        await updateProduct(id, payload);
        setSuccessMsg("Product updated successfully!");
      } else {
        await addProduct(payload);
        setSuccessMsg("Product added successfully!");
      }

      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      console.log(isEdit, id);
      fetchProductById(id); // async fetch, sets selectedProduct
    }
  }, [isEdit, id]);

  useEffect(() => {
    if (isEdit && selectedProduct) {
      setTitle(selectedProduct.title);
      setAuthor(selectedProduct.author);
      setPrice(selectedProduct.price.toString());
      setProductType(selectedProduct.product_type);
      setImagePreview(selectedProduct.cover_url);
    }
  }, [selectedProduct, isEdit]);

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: theme.colors.adminCanvasGrey }}>
      <div style={{ flexGrow: 1, overflowY: "auto" }}>
        {/* Header */}
        <div
          style={{
            backgroundColor: theme.colors.cleanPageWhite,
            padding: "1.5rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.colors.subtleGrey}`,
          }}
        >
          <button
            onClick={() => navigate("/admin/products")}
            style={{
              background: "none",
              border: "none",
              color: theme.colors.adminInk,
              fontSize: theme.fontSizes.h3,
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: theme.fontSizes.h1, color: theme.colors.adminInk, fontWeight: theme.fontWeight.bold }}>
            {isEdit ? "Edit Product" : "Add New Product"}
          </h1>
          <div />
        </div>

        {/* Form */}
        <div
          style={{
            backgroundColor: theme.colors.cleanPageWhite,
            margin: "2rem auto",
            padding: "2rem",
            borderRadius: theme.borderRadius.card,
            boxShadow: theme.boxShadow.subtle,
            maxWidth: "600px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h2
              style={{
                fontSize: theme.fontSizes.h2,
                color: theme.colors.adminInk,
                fontWeight: theme.fontWeight.semiBold,
                marginBottom: "1.5rem",
              }}
            >
              Basic Product Information
            </h2>

            <FormField label="Title" value={title} onChange={setTitle} error={errors.title} />
            <FormField label="Author" value={author} onChange={setAuthor} error={errors.author} />
            <FormField label="Price" value={price} onChange={setPrice} error={errors.price} type="number" />

            {/* Product Type Toggle */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  checked={productType === "digital"}
                  onChange={(e) => setProductType(e.target.checked ? "digital" : "physical")}
                />
                Digital Product
              </label>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {errors.image && <p style={errorStyle}>{errors.image}</p>}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    marginTop: "1rem",
                    maxHeight: "150px",
                    borderRadius: theme.borderRadius.input,
                    border: `1px solid ${theme.colors.subtleGrey}`,
                  }}
                />
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                backgroundColor: theme.colors.deepTeal,
                color: theme.colors.navWhite,
                fontSize: theme.fontSizes.h3,
                fontWeight: theme.fontWeight.semiBold,
                padding: "0.75rem",
                borderRadius: theme.borderRadius.button,
                border: "none",
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.6 : 1,
                marginTop: "1.5rem",
              }}
            >
              {saving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
            </button>

            {successMsg && (
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  color: theme.colors.successGreen,
                  fontSize: theme.fontSizes.sm,
                }}
              >
                {successMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable input
function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      {error && <p style={errorStyle}>{error}</p>}
    </div>
  );
}

// Styles
const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontSize: theme.fontSizes.body,
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.adminInk,
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  border: `1px solid ${theme.colors.subtleGrey}`,
  borderRadius: theme.borderRadius.input,
  fontSize: theme.fontSizes.body,
  fontFamily: "Open Sans",
  color: theme.colors.adminInk,
  outline: "none",
};

const errorStyle = {
  marginTop: "0.25rem",
  fontSize: theme.fontSizes.sm,
  color: theme.colors.errorRed,
};
