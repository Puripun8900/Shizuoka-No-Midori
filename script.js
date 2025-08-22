// Shopping cart functionality
let cart = []
let total = 0

function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ name, price, quantity: 1 })
  }
  updateCart()
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name)
  updateCart()
}

function updateCart() {
  const cartItems = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")

  cartItems.innerHTML = ""
  total = 0

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    total += itemTotal

    const cartItem = document.createElement("div")
    cartItem.className = "cart-item"
    cartItem.innerHTML = `
            <div>
                <div>${item.name}</div>
                <div>$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <button onclick="removeFromCart('${item.name}')" style="background: #ff4444; color: white; border: none; padding: 0.2rem 0.5rem; border-radius: 4px; cursor: pointer;">×</button>
        `
    cartItems.appendChild(cartItem)
  })

  cartTotal.textContent = `Total: $${total.toFixed(2)}`
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }
  alert(
    `Thank you for your order! Total: $${total.toFixed(2)}\n\nWe'll process your order and send you a confirmation email soon.`,
  )
  cart = []
  updateCart()
}

// Product filtering
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter products
      const filter = btn.dataset.filter
      const products = document.querySelectorAll(".product-card")

      products.forEach((product) => {
        if (filter === "all" || product.dataset.category === filter) {
          product.style.display = "block"
        } else {
          product.style.display = "none"
        }
      })
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})
