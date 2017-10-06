"use strict";
/**
 * Creates the elements and actions to the main view (index.html)
 */

// Load the data from local storage
var items = JSON.parse(localStorage.getItem('items'));
var featured = items.featured;
var pepe = items.pepe;
var feel = items.feel;
var doge = items.doge;

// Actions at start
$(document).ready(function () {
	loadFeatured();
	loadCategories(pepe.items, 'pepe-col-1', 'pepe-col-2');
	loadCategories(feel.items, 'feel-col-1', 'feel-col-2');
	loadCategories(doge.items, 'doge-col-1', 'doge-col-2');
	addNavBar();
	showUserInfo();
	updateCartIcon();
});

// Adds the featured items into the carousel
function loadFeatured() {
	var $carousel = $('#featured-carousel');
	$.each(featured.items, function (index, value) {
		var onClickEvent = function () {
			sessionStorage.setItem('currentItem', JSON.stringify(value));
			location.href = 'src/views/product.html'
		};
		$carousel.append($('<div>', {class: (index === 0)? 'item active': 'item', click: onClickEvent})
				.append($('<a>', {href: '#self'})
				.append($('<img>', {src: value.img, alt: '', style: 'width:100%;'})))
		);
	});
}

function removeSpaces(text) {
	return text.replace(/\s/g,'');
}

// Add dynamically the items in the view
function loadCategorie(categorie, data){
	var $categorie = $("#" + categorie);
	var items = "";
	$.each(data, function (index, value) {
		var onClickEvent = function () {
			sessionStorage.setItem('currentItem', JSON.stringify(value));
			location.href = 'src/views/product.html'
		};
		$categorie.append(" <div class=\"product-item\" id=\"product-" + removeSpaces(value.name) + "\">\n" +
			"           <a href=\"#self\">\n" +
			"               <img src=" + value.img + " " + "class=\"image\" style=\"height:600px\">\n" +
			"           </a>\n" +
			"               <div class=\"middle\">\n" +
			"                    <div class=\"text\">" + value.name + "</div>\n" +
			"                    <div class=\"text\">"+ "Precio $" + value.price + "</div>\n" +
			"                    <div class=\"text\">"+ "Restantes " + value.stock + "</div>\n" +
			"              </div>\n" +
			"             </div>");
		$('#product-' + removeSpaces(value.name)).click(onClickEvent);
	});
}

// Adds the items in col1 and col2
function loadCategories(data, col1, col2) {
	var left = [];
	var right = [];
	for(var i = 0; i < data.length / 2; i++) {left.push(data[i]);}
	for(var j = Math.round(data.length / 2); j < data.length; j++) {right.push(data[j]);}

	loadCategorie(col1, left);
	loadCategorie(col2, right);
}
