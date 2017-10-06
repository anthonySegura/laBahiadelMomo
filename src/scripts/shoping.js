"use strict";

/**
 * Creates the elements and actions to the product view (product.html)
 */

// Gets the product and current user from the session storage
var product = sessionStorage.getItem('currentItem');
var currentUser = sessionStorage.getItem('currentUser');

$(document).ready(function () {
	product = JSON.parse(product);
	document.title = (product === null)? 'Producto' : product.name;
	addNavBar();
	showUserInfo();
	overrideNavbarLinks();
	showProductInfo();
	updateCartIcon();
});

// Show all the product info
function showProductInfo() {
	$('#productName').text(product.name);
	$('#productImg').attr('src', '../../' + product.img);
	$('#productPrice').append('Precio $' + product.price);
	$('#productStock').append('<div id="stockValue">Restantes ' + product.stock + '</div>');
}

// Adds the current product to the user's cart
function addToCart() {
	var user = sessionStorage.getItem('currentUser');
	var product = sessionStorage.getItem('currentItem');
	if(user !== null){
		user = JSON.parse(user);
		// Verifys if the product is available
		if(verifyProductStock(JSON.parse(product))) {
			user.cart.push(JSON.parse(product));
			sessionStorage.setItem('currentUser', JSON.stringify(user));
			updateCartIcon();
			updateUser(user);
			//sessionStorage.setItem('currentItem', JSON.stringify(product));
			updateProductList(JSON.parse(product));
		}
		else{
			alert('Ya no hay momos papuh :v');
		}
	}
	else{
		alert('Inicie sesion');
	}
}

// Verifys if the product is available
function verifyProductStock(product) {
	return product.stock > 0;
}

function addToWishList() {
	
}

function removeSpaces(text) {
	return text.replace(/\s/g,'');
}

// Adds the cart items into the cart view
function loadCartItems() {
	var $productList = $('#productList');
	currentUser = JSON.parse(currentUser);
	if(currentUser.cart.length === 0){
		$('#cartTitle').text('Tu carrito esta vacio');
	}
	currentUser.cart.map(function (item) {
		    $productList.append($('<li>', {id: removeSpaces(item.name)})
						.append('<div style="display: inline-flex; margin-right: 5px;">' + item.name + ' $ ' + item.price + '</div>')
						.append('<img style="height: 25px; width: 25px; margin-right: 10px;" src =' + '../../' + item.img + '>'
									+ '<button class="btn btn-danger" id= ' + item.id + '>Eliminar</button><hr>'));
	});
}

// Removes the selected item from the cart
function removeFromCart() {
	var btnId = event.target.id;
	for(var i = currentUser.cart.length - 1; i >= 0; i--){
		if(currentUser.cart[i].id == btnId){
			$('#productList').remove('#' + removeSpaces(currentUser.cart[i].name));
			console.log('#' + removeSpaces(currentUser.cart[i].name));
			currentUser.cart.splice(currentUser.cart.indexOf(currentUser.cart[i]), 1);
		}
	}
	sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Update the user's cart
function updateUser(user) {
	var users = localStorage.getItem('users');
	if(users !==  null){
		users = JSON.parse(users);
		for(var i = 0; i < users.length; i++){
			if(user.user_info.name === users[i].user_info.name && user.user_info.password === users[i].user_info.password){
				users[i].cart = user.cart;
			}
		}
		localStorage.setItem('users', JSON.stringify(users));
	}
}

// Update the selected product in the local storage
function updateProductList(product) {
	var items = localStorage.getItem('items');
	items = JSON.parse(items);
	for(var key in items) {
		for (var i = 0; i < items[key].items.length; i++) {
			if (items[key].items[i].id === product.id) {
				console.log('product updated');
				var updatedProduct = updateProduct(product, items);
				items[key].items[i] = updatedProduct;
			}
		}
	}
	localStorage.setItem('items', JSON.stringify(items));
	sessionStorage.setItem('currentItem', JSON.stringify(product));
}

// Update an individual product
function updateProduct(product) {
	product.solds += 1;
	product.stock -= 1;
	$('#productStock').find('#stockValue').remove();
	$('#productStock').append('<div id="stockValue">Restantes ' + product.stock + '</div>');
	return product;
}

// Overrides the hrefs of the navbar menu
function overrideNavbarLinks() {
	$('.navbar-brand').attr("href", "../../index.html#");
	$('#featuredLink').attr("href", "../../index.html#featured");
	$('#pepeLink').attr("href", "../../index.html#pepe");
	$('#feelLink').attr("href", "../../index.html#feel");
	$('#dogeLink').attr("href", "../../index.html#doge");
	$('#loginBtn').attr("href", "register.html");
	$('#cartIcon').attr("href", "cart.html");
}
