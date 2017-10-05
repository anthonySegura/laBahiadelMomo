/**
 * Auxiliar functions for add dynamically a navbar
 */

// Add the user info to the navbar
// Change the login/logout button
function showUserInfo() {
	var currentUser = sessionStorage.getItem('currentUser');
	if(currentUser === null){
		$("#loginBtn").html("<span class=\"glyphicon glyphicon-log-in\" style=\"margin-right: 5px\"></span>Login");
	}
	else{
		currentUser = JSON.parse(currentUser);
		$("#loginBtn").attr('href', '#');
		$("#loginBtn").click(closeSession);
		$("#loginBtn").html("<span class=\"glyphicon glyphicon-log-out\" style=\"margin-right: 5px\"></span>Salir");
		$("#right-navBar").append("<li><a href=\"#\" style=\"text-transform: capitalize\"><span class=\"glyphicon glyphicon-user\" style=\"margin-right: 5px;\"></span>"+currentUser.user_info.name+"</a></li>");
	}
}

function closeSession() {
	console.log('closing session');
	sessionStorage.clear();
	location.reload();
}


function updateCartIcon() {
	var user = sessionStorage.getItem('currentUser');
	if(user !== null && JSON.parse(user).cart.length > 0) {
		$('.glyphicon.glyphicon-shopping-cart')
			.parent().find('#cartCounter').remove();
		$('.glyphicon.glyphicon-shopping-cart')
			.parent()
			.append($('<div>', {style: 'margin-left: 2px; color: #9E9E9E; display: inline;' ,id: 'cartCounter'})
				.append(JSON.parse(user).cart.length));
	}
}

// Inject the navbar html code into the header
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
		"                            <li><a id=\"featuredLink\" href=\"#featured\">Momos Destacados</a></li>\n" +
		"                            <li><a id=\"pepeLink\" href=\"#pepe\">Pepe</a></li>\n" +
		"                            <li><a id=\"feelLink\" href=\"#feel\">Feel</a></li>\n" +
		"                            <li><a id=\"dogeLink\" href=\"#doge\">Doge</a></li>\n" +
		"                        </ul>\n" +
		"                    </li>\n" +
		"                </ul>\n" +
		"                <ul class=\"nav navbar-nav navbar-right\" id=\"right-navBar\">\n" +
		"                    <!--<li><a href=\"#\"><span class=\"glyphicon glyphicon-user\"></span> Sign Up</a></li>-->\n" +
		"                    <li><a href=\"#\">Mi lista de deseos</a></li>\n" +
		"                    <li><a id=\"cartIcon\" href=\"src/views/cart.html\"><span class=\"glyphicon glyphicon-shopping-cart\"></span></a></li>\n" +
		"					<li><a href=\"src/views/register.html\" id=\"loginBtn\"></a></li>\n"+
		"                </ul>\n" +
		"              </div>\n" +
		"            </div>\n" +
		"        </nav>");

}