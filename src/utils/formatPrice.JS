

export const formatPrice = (price) => {
    // return price.toLocaleString("vi-VN") + "đ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

};

