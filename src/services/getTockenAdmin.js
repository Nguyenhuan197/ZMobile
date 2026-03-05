



export const GetAPI_Authorization = async (url) => {
    const token = localStorage.getItem('ZMOBILE_KEY_2026');
    if (!token) {
        throw new Error("No token found");
    }

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return res.json();
};
