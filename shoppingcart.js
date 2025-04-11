
let cart = JSON.parse(localStorage.getItem("cart")) || [
    // localStorage
    { name: "有機紅棗桂圓銀耳飲-單入", price: 85, quantity: 1 },
    { name: "有機紅棗桂圓銀耳飲-禮盒", price: 500, quantity: 1 },
    { name: "台灣本土香菇乾-600g", price: 850, quantity: 1 },
    { name: "台灣本土銀耳乾-600g", price: 550, quantity: 1 },
    { name: "有機金針菇-100g", price: 30, quantity: 1 },
    { name: "牛肝菌-30g/入", price: 350, quantity: 1 },
    { name: "綜合火鍋菇料-250g", price: 120, quantity: 1 },
    { name: "金針菇餅乾-椒鹽味-100g", price: 70, quantity: 1 }
];

function renderCart() {
    const cartItems = document.getElementById("cart-bbbbb");
    const totalPrice = document.getElementById("total-price");

    cartItems.innerHTML = ""; // 清空表格
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

    // ✨ 把目前的購物車資料存到 localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}


function removeItem(index) {
    cart.splice(index, 1); // 從購物車資料移除該項目
    renderCart(); // 重新渲染
}

renderCart(); // 頁面一進來就顯示

// 加減商品數量
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


// ✅ 結帳功能
document.querySelector(".checkout-abc").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("🍃什麼‼️你在不買東西購物車就要長草了🌱");
        return;
    }

    // 假裝送出訂單
    Swal.fire({
        icon: "error",
        title: "✨ 香菇出沒 ✨",
        text: "⚙️ 賣場功能維護中暫時無法結帳 🕸️",
        confirmButtonText: "返回官網"

        // 為了點選返回官網↓用then來設定返回的頁面
    }).then((result) => {
        if (result.isConfirmed) {
            // ✅ 只在點按 SweetAlert 的時候執行這兩行
            cart.length = 0;
            localStorage.removeItem("cart"); // 有記憶功能的話，順便清掉
            renderCart(); 
            window.location.href = "香菇大本營-1.html"; //  自行替換為目標頁面
        }
    });
});

renderCart();

// 重新載入頁面
function resetCart() {
    localStorage.removeItem("cart");
    location.reload();
}
console.log("購物車最後更新時間：2025-04-08");