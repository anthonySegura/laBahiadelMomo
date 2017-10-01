"use strict";
/**
 * Create the elements and actions to the main view (index.html)
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
	var currentUser = sessionStorage.getItem('currentUser');
	if(currentUser === null){
		$("#loginBtn").html("<span class=\"glyphicon glyphicon-log-in\" style=\"margin-right: 5px\"></span>Login");
	}
	else{
		currentUser = JSON.parse(currentUser);
		$("#loginBtn").attr('href', '#');
		$("#loginBtn").click(closeSession);
		$("#loginBtn").html("<span class=\"glyphicon glyphicon-log-out\" style=\"margin-right: 5px\"></span>Salir");
		//<a href="#"><span class="glyphicon glyphicon-user"></span>currentUser.user_info.name</a></li>
		$("#right-navBar").append("<li><a href=\"#\"><span class=\"glyphicon glyphicon-user\" style=\"margin-right: 5px\"></span>"+currentUser.user_info.name+"</a></li>");
	}
});

// Adds the featured items into the carousel
function loadFeatured() {
	var carousel = $('#featured-carousel');
	$.each(featured.items, function (index, value) {
		var onClickEvent = function () {
			// FIXME: agregar funcion para ir a la pagina del producto
			console.log(value);
		};
		carousel.append($('<div>', {class: (index === 0)? 'item active': 'item', click: onClickEvent})
				.append($('<a>', {href: '#self'})
				.append($('<img>', {src: value.img, alt: '', style: 'width:100%;'})))
		);
	});
}

function loadCategorie(categorie, data){
	var cat = $("#" + categorie);
	$.each(data, function (index, value) {
		var html = " <div class=\"product-item\">\n" +
			"                        <a href=\"#self\">\n" +
			"                            <img src=" + value.img + " " + "class=\"image\" style=\"height:600px\">\n" +
			"                        </a>\n" +
			"                        <div class=\"middle\">\n" +
			"                            <div class=\"text\">" + value.name + "</div>\n" +
			"                            <div class=\"text\">"+ "Precio $" + value.price + "</div>\n" +
			"                            <div class=\"text\">"+ "Restantes " + value.stock + "</div>\n" +
			"                        </div>\n" +
			"                    </div>";
		cat.append(html);
	});
}

function loadCategories(data, col1, col2) {
	var left = [];
	var right = [];
	for(var i = 0; i < data.length / 2; i++) {left.push(data[i]);}
	for(var j = Math.round(data.length / 2); j < data.length; j++) {right.push(data[j]);}

	loadCategorie(col1, left);
	loadCategorie(col2, right);
}

function closeSession() {
	console.log('closing session');
	sessionStorage.clear();
	location.reload();
}

function addNavBar(){
	$("header").html("<nav class=\"navbar navbar-inverse navbar-fixed-top\" style=\"margin-bottom: 0px; border-radius: 0px;\">\n" +
		"            <div class=\"container-fluid\">\n" +
		"                <div class=\"navbar-header\">\n" +
		"										<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n" +
		"										<span class=\"icon-bar\"></span>\n" +
		"										<span class=\"icon-bar\"></span>\n" +
		"										<span class=\"icon-bar\"></span>\n"+
		"										</button>\n" +
		"                    <a class=\"navbar-brand\" href=\"#\"><strong>La Bahía del Momo</strong></a>\n" +
		"                </div>\n" +
		"                <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n"+
			"                <ul class=\"nav navbar-nav\">\n" +
			"                    <li class=\"dropdown\">\n" +
			"                        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Categorías\n" +
			"                            <span class=\"caret\"></span></a>\n" +
			"                        <ul class=\"dropdown-menu\">\n" +
			"                            <li><a href=\"#featured\">Momos Destacados</a></li>\n" +
			"                            <li><a href=\"#pepe\">Pepe</a></li>\n" +
			"                            <li><a href=\"#feel\">Feel</a></li>\n" +
			"                            <li><a href=\"#doge\">Doge</a></li>\n" +
			"                        </ul>\n" +
			"                    </li>\n" +
			"                </ul>\n" +
			"                <ul class=\"nav navbar-nav navbar-right\" id=\"right-navBar\">\n" +
			"                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>-->\n" +
			"                    <li><a href=\"#\">Mi lista de deseos</a></li>\n" +
			"                    <li><a href=\"#\"><span class=\"glyphicon glyphicon-shopping-cart\"></span></a></li>\n" +
			"					<li><a href=\"src/views/register.html\" id=\"loginBtn\"></a></li>\n"+
			"                </ul>\n" +
		"              </div>\n" +
		"            </div>\n" +
		"        </nav>");
}