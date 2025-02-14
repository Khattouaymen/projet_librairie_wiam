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
    let cartCount = document.querySelector("#cart-count");
    let totalItems = 0; // Nombre total d'articles dans le panier
    let totalPrice = 0; // Prix total du panier

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
        totalPrice += prix; // Ajoute le prix du produit ajouté au total
        updateTotalPrice(); // Met à jour le total
    }

    // Fonction pour mettre à jour le total du panier
    function updateTotalPrice() {
        let total = 0;
        let quantities = document.querySelectorAll(".cart-quantity");

        quantities.forEach(quantity => {
            let price = parseFloat(quantity.parentElement.querySelector(".cart-price").textContent.replace("dhs", "").trim());
            total += price * quantity.value; // Calcule le total en fonction des quantités
        });

        document.querySelector(".total-price").textContent = total.toFixed(2) + "dhs"; // Affiche le total avec 2 décimales
    }

    // Fonction pour mettre à jour le nombre d'articles dans le panier
    function updateCartCount() {
        cartCount.textContent = totalItems;
    }

    // Attacher un événement à chaque bouton d'ajout au panier
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function() {
            let productBox = button.closest(".box");
            let src = productBox.querySelector("img").src;
            let name = productBox.querySelector("h3").textContent;
            alert("تمت إضافة المنتج إلى السلة");
            // Récupérer et nettoyer le prix
            let priceText = productBox.querySelector(".price").textContent;
            let price = parseFloat(priceText.replace(/[^\d.-]/g, "")); // Supprimer tout sauf les chiffres et le point décimal

            if (isNaN(price)) {
                console.error("Erreur dans le format du prix pour le produit: ", name);
                return;
            }

            cartitem(src, name, price); // Ajouter l'article au panier
        });
    });

    // Ouverture/fermeture du panier
    document.querySelector("#cart-btn").addEventListener("click", function() {
        document.querySelector(".cart").classList.toggle("active");
    });

    document.querySelector("#close-cart").addEventListener("click", function() {
        document.querySelector(".cart").classList.remove("active");
    });
    
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

