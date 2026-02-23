

// Phiên bản mới
export async function UpdateSevices(API, Data, Method) {
    try {
        const response = await fetch(API, {
            method: Method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Data),
        });

        // Thử parse JSON, nếu fail thì lấy text để debug
        let result;
        try {
            result = await response.json();
        } catch (err) {
            console.log(err);
            const text = await response.text();
            console.error("Server trả về không phải JSON:", text);
            return { status: false, message: text }; // trả về object an toàn

        }

        return result; // JSON hợp lệ từ server
    } catch (error) {
        console.error('Fetch lỗi:', error);
        return { status: false, message: error.message };
    }
}


// Update File IMG
export async function UpdateSevicesFile(API, Data, Method) {
    try {
        // Tạo FormData
        const formData = new FormData();
        formData.append("id_User", Data.id_User);
        formData.append("Name", Data.Name);
        if (Data.fileImage) {
            formData.append("fileImage", Data.fileImage);
        }

        const response = await fetch(API, {
            method: Method,
            body: formData, // body là FormData
            // **Không cần set headers**, browser tự thêm boundary
        });

        let result;
        try {
            result = await response.json();
        } catch (err) {
            console.log(err);
            const text = await response.text();
            console.error("Server trả về không phải JSON:", text);
            return { status: false, message: text };
        }

        return result;
    } catch (error) {
        console.error('Fetch lỗi:', error);
        return { status: false, message: error.message };
    }
}

export async function UpdateSevicesNo__JSON(API, Method) {
    try {
        const response = await fetch(API, {
            method: Method,
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) return null;
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Fetch lỗi:', error);
        return false;
    }
}


export async function DeleteService(API) {
    try {
        const response = await fetch(API, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            console.error('Xoá thất bại:', response.status);
            return null;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Fetch lỗi:', error);
        return false;
    }
}
