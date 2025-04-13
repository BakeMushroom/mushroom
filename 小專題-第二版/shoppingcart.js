let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.getElementById("cart-bbbbb");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
            <button onclick="decreaseQuantity(${index})">－</button>
            ${item.quantity}
            <button onclick="increaseQuantity(${index})">＋</button>
        </td>
        <td>${subtotal}</td>
        <td><button onclick="removeItem(${index})">刪除</button></td>
        `;
        cartItems.appendChild(row);
    });

    totalPrice.textContent = total;

    // ✨ 更新 localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); // 更新數字徽章
}

function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    renderCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        if (confirm("數量為 1，確定要刪除這項商品？")) {
            removeItem(index);
            return;
        }
    }
    renderCart();
}

// ✅ SweetAlert2 結帳
document.querySelector(".checkout-abc").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("🍃什麼‼️你在不買東西購物車就要長草了🌱");
        return;
    }

    Swal.fire({
        icon: "error",
        title: "✨ 香菇出沒 ✨",
        text: "⚙️ 賣場功能維護中暫時無法結帳 🕸️",
        confirmButtonText: "返回官網"
    }).then((result) => {
        if (result.isConfirmed) {
            cart.length = 0;
            localStorage.removeItem("cart");
            renderCart();
            updateCartBadge();
            window.location.href = "mushrooooooom-1.html";
        }
    });
});

// 重設購物車
function resetCart() {
    localStorage.removeItem("cart");
    location.reload();
}

// ✅ 顯示購物車數字徽章
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;

    const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    badge.textContent = totalCount;
    badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
}

renderCart();
console.log("購物車最後更新時間：2025-04-13");
