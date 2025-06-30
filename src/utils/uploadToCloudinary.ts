export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const response = await fetch(
    url,
    {
      method: "POST",
      body: formData,
    }
  );


  const data = await response.json();
  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  return data.secure_url;
}
