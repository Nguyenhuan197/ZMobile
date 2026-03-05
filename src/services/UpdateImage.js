
const apiUpdateImage = import.meta.env.VITE_FileUpdate;

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "Huan-education");

        const res = await fetch(`${apiUpdateImage}`, {
            method: "POST",
            body: formData
        });

        if (!res.ok) throw new Error("Upload thất bại");

        const data = await res.json();
        return data.secure_url; // Trả về link ảnh sau khi upload thành công
    } catch (error) {
        console.error("Lỗi upload đơn lẻ:", error);
        return null;
    }
};