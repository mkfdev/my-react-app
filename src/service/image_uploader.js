class ImageUploader {
  //cloudinary upload api사용
  async upload(file) {
    const url = "https://api.cloudinary.com/v1_1/dk1ydorxv/image/upload";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "clecsuqk");
    const result = await fetch(url, { method: "POST", body: data });
    return await result.json();
  }
}

export default ImageUploader;
