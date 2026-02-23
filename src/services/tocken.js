export default function DecodeJWT(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = decodeURIComponent(
            atob(payload)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(decoded);
    } catch (error) {
        console.error("Giải mã token lỗi:", error);
        return null;
    }
}