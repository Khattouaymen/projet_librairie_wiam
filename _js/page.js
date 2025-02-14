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





document.addEventListener('DOMContentLoaded', function () {
    // Variables pour la gestion du panier
    let cartItems = []; // Tableau pour stocker les articles dans le panier

    // Fonction pour ajouter un produit au panier
    function addToCart(imgSrc, productName, productPrice, quantity) {
        let cartItemsContainer = document.querySelector(".cart .cart-content");

        // Créer un nouvel élément pour l'article dans le panier
        let cartItem = document.createElement("div");
        cartItem.className = "cart-box";

        let img = document.createElement('img');
        img.src = imgSrc;
        img.className = "cart-img";
        cartItem.appendChild(img);

        let detailBox = document.createElement("div");
        detailBox.className = "detail-box";

        let productNameElem = document.createElement("div");
        productNameElem.className = "cart-product-title";
        productNameElem.textContent = productName;

        let productPriceElem = document.createElement("div");
        productPriceElem.className = "cart-price";
        productPriceElem.textContent = (productPrice * quantity) + " د.م";

        let quantityElem = document.createElement("input");
        quantityElem.className = "cart-quantity";
        quantityElem.value = quantity;
        quantityElem.type = "number";
        quantityElem.min = 1;
        quantityElem.addEventListener("input", function() {
            updateTotalPrice(); // Mettre à jour le prix total quand la quantité change
        });

        detailBox.appendChild(productNameElem);
        detailBox.appendChild(productPriceElem);
        detailBox.appendChild(quantityElem);
        cartItem.appendChild(detailBox);

        // Bouton de suppression de l'article
        let removeBtn = document.createElement("i");
        removeBtn.className = "bx bxs-trash-alt cart-remove";
        removeBtn.onclick = function() {
            cartItem.remove();
            updateTotalPrice();
        };
        cartItem.appendChild(removeBtn);

        cartItemsContainer.appendChild(cartItem);

        // Ajouter l'article au tableau du panier
        cartItems.push({ name: productName, price: productPrice, quantity: quantity });

        // Mettre à jour le total du panier
        updateTotalPrice();

        // Alerte
        alert("تمت إضافة المنتج إلى السلة"); // Alerte de confirmation
    }

    // Fonction pour mettre à jour le prix total du panier
    function updateTotalPrice() {
        let total = 0;
        cartItems.forEach(item => {
            total += item.price * item.quantity;
        });

        document.querySelector(".total-price").textContent = total.toFixed(2) + " د.م"; // Afficher le total avec 2 décimales
    }

    // Ajouter un événement au bouton "اضف الى السلة"
    let addToCartButton = document.querySelector(".botn"); // Sélectionner le bouton "Ajouter au panier"
    addToCartButton.addEventListener("click", function() {
        let productContainer = addToCartButton.closest(".product-container");
        let imgSrc = productContainer.querySelector("img").src;
        let productName = productContainer.querySelector("h1").textContent;
        let productPrice = parseFloat(productContainer.querySelector(".price").textContent.replace(/[^\d.-]/g, ""));
        let quantity = parseInt(document.querySelector("#quantity").value);

        addToCart(imgSrc, productName, productPrice, quantity); // Ajouter l'article au panier
    });

    // Ouvrir/fermer le panier
    document.querySelector("#cart-btn").addEventListener("click", function() {
        document.querySelector(".cart").classList.toggle("active");
    });

    document.querySelector("#close-cart").addEventListener("click", function() {
        document.querySelector(".cart").classList.remove("active");
    });
});



// Récupérer les éléments
const decreaseBtn = document.getElementById('decrease-btn');
const increaseBtn = document.getElementById('increase-btn');
const quantityInput = document.getElementById('quantity');

// Fonction pour diminuer la quantité
decreaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
});

// Fonction pour augmenter la quantité
increaseBtn.addEventListener('click', () => {
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
});





document.addEventListener('DOMContentLoaded', function() {
    // On récupère le conteneur des favoris
    const favoritesList = document.getElementById('favoris-list');

    // On récupère les boutons "Ajouter aux favoris" pour chaque produit
    const favoriteButtons = document.querySelectorAll('.product-btn i.fas.fa-heart');

    // Tableau pour stocker les produits favoris
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Mettre à jour le nombre de favoris dans l'icône
    const updateFavoritesCount = () => {
        document.getElementById('favorites-count').textContent = favorites.length;
    };

    // Fonction pour afficher les favoris sur la page
    const displayFavorites = () => {
        favoritesList.innerHTML = '';  // On vide le conteneur des favoris
        favorites.forEach(favorite => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.innerHTML = `
                <div class="favorite-item-content">
                    <img src="${favorite.image}" alt="${favorite.title}">
                    <h3>${favorite.title}</h3>
                    <p>${favorite.price}</p>
                </div>
            `;
            favoritesList.appendChild(favoriteItem);
        });
    };

    // Fonction pour ajouter un livre aux favoris
    const addToFavorites = (image, title, price) => {
        // Crée un objet pour le produit
        const favorite = { image, title, price };
        
        // Ajoute le produit à la liste des favoris
        favorites.push(favorite);

        // Sauvegarde les favoris dans le localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Met à jour l'affichage des favoris et le nombre
        displayFavorites();
        updateFavoritesCount();
    };

    // Ajouter un écouteur d'événement sur chaque bouton "Ajouter aux favoris"
    favoriteButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productBox = button.closest('.box');
            const image = productBox.querySelector('img').src;
            const title = productBox.querySelector('h3').textContent;
            const price = productBox.querySelector('.price').textContent;

            addToFavorites(image, title, price);
        });
    });

    // Affiche les favoris à chaque chargement de la page
    displayFavorites();
    updateFavoritesCount();
});
