"use strict";

/**
 * Creates the elements and actions to the product view (product.html)
 */

var product = sessionStorage.getItem('currentItem');

$(document).ready(function () {
	product = JSON.parse(product);
	document.title = (product === null)? 'Producto' : product.name;
	addNavBar();
	showUserInfo();
	overrideNavbarLinks();
	showProductInfo();
});

// Show all the product info
function showProductInfo() {
	$('#productName').text(product.name);
	$('#productImg').attr('src', '../../' + product.img);
	$('#productPrice').append('Precio $' + product.price);
	$('#productStock').append('Restantes ' + product.stock);
}

function overrideNavbarLinks() {
	$('.navbar-brand').attr("href", "../../index.html#");
	$('#featuredLink').attr("href", "../../index.html#featured");
	$('#pepeLink').attr("href", "../../index.html#pepe");
	$('#feelLink').attr("href", "../../index.html#feel");
	$('#dogeLink').attr("href", "../../index.html#doge");
	$('#loginBtn').attr("href", "../../register.html");
}



