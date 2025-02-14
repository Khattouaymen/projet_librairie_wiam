// Variables pour le panier et les éléments du formulaire
let searchForm = document.querySelector(".search-form");
let shoppingCart = document.querySelector(".cart");
let loginForm = document.querySelector(".login-form");
let navbar = document.querySelector(".navbar");
let menuBtn = document.querySelector("#menu-btn");
let loginBtn = document.querySelector("#login-btn");
let cartBtn = document.querySelector("#cart-btn");
let cart = document.querySelector('.cart');
let cartIcon = document.querySelector('#close-cart');
let cartCount = document.querySelector("#cart-count"); // Élément où le nombre d'articles sera affiché

// Fonction pour fermer tous les éléments sauf celui passé en paramètre
function closeAllExcept(except) {
    const elements = [searchForm, shoppingCart, loginForm, navbar];
    elements.forEach(element => {
        if (element !== except) {
            element.classList.remove("active");
        }
    });
}

// Fermer tous les éléments quand l'utilisateur fait défiler la page
window.onscroll = () => {
    closeAllExcept(null);
};

// Événements pour ouvrir/fermer les éléments
document.querySelector("#search-btn").onclick = () => {
    searchForm.classList.toggle("active");
    shoppingCart.classList.remove("active");  // Ferme le panier
    loginForm.classList.remove("active");
    closeAllExcept(searchForm);
};

cartBtn.onclick = () => {
    if (cart.classList.contains("active")) {
        cart.classList.remove("active");
    } else {
        cart.classList.add("active");
    }
    searchForm.classList.remove("active");
    loginForm.classList.remove("active");
    closeAllExcept(cart);
};

loginBtn.onclick = () => {
    loginForm.classList.toggle("active");
    searchForm.classList.remove("active");
    shoppingCart.classList.remove("active");
    closeAllExcept(loginForm);
};



// Panier
let totalItems = 0;
let totalPrice = 0;

// Fonction pour ajouter un produit au panier
function cartitem(src, name, prix) {
    let cartItemsContainer = document.querySelector(".cart .cart-content");

    let cartItem = document.createElement("div");
    cartItem.className = "cart-box";

    let img = document.createElement('img');
    img.src = src;
    img.className = "cart-img";
    cartItem.appendChild(img);

    let detailBox = document.createElement("div");
    detailBox.className = "detail-box";

    let productNameElem = document.createElement("div");
    productNameElem.className = "cart-product-title";
    productNameElem.textContent = name;

    let productPriceElem = document.createElement("div");
    productPriceElem.className = "cart-price";
    productPriceElem.textContent = prix + "dhs";

    let quantityElem = document.createElement("input");
    quantityElem.className = "cart-quantity";
    quantityElem.value = 1;
    quantityElem.type = "number";
    quantityElem.min = 1;
    quantityElem.addEventListener("input", function() {
        updateTotalPrice();
    });

    detailBox.appendChild(productNameElem);
    detailBox.appendChild(productPriceElem);
    detailBox.appendChild(quantityElem);
    cartItem.appendChild(detailBox);

    let removeBtn = document.createElement("i");
    removeBtn.className = "bx bxs-trash-alt cart-remove";
    removeBtn.onclick = () => {
        cartItem.remove();
        totalItems--;
        updateCartCount();
        updateTotalPrice();
    };
    cartItem.appendChild(removeBtn);

    cartItemsContainer.appendChild(cartItem);

    totalItems++;
    updateCartCount();
    totalPrice += prix;
    updateTotalPrice();

    // Afficher l'alerte après avoir ajouté l'article au panier
    alert("تمت إضافة المنتج إلى السلة");
}

// Fonction pour mettre à jour le total du panier
function updateTotalPrice() {
    let total = 0;
    let quantities = document.querySelectorAll(".cart-quantity");

    quantities.forEach(quantity => {
        let price = parseFloat(quantity.parentElement.querySelector(".cart-price").textContent.replace("dhs", "").trim());
        total += price * quantity.value;
    });

    document.querySelector(".total-price").textContent = total.toFixed(2) + "dhs";
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    let cartCount = document.querySelector("#cart-count");
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Événements pour ajouter un produit au panier
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function() {
        let productBox = button.parentElement;
        let src = productBox.querySelector("img").src;
        let name = productBox.querySelector("h3").textContent;
        let price = parseFloat(productBox.querySelector(".price").textContent.replace("dhs", "").trim());

        cartitem(src, name, price);
    });
});
