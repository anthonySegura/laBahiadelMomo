const users = JSON.parse(localStorage.getItem('users'));

$(document).ready(function () {
	addNavBar();
	showUserInfo();
	overrideNavMenu();
	lessMoney();
	moreMoney();
	lessProducts();
	moreProducts();
});

// Overrides the hrefs of the nav bar menu
function overrideNavMenu() {
	$('#right-navBar').find('#wishList').remove();
	$('#right-navBar').find('#cartIcon').remove();
	$('#loginBtn').attr("href", "register.html");
	$('.dropdown-toggle').text('Consultas');
	$('.dropdown-menu').empty();
	addDropMenu();
}

function addDropMenu() {
	const reports = ['Comprador con mas productos',
		             'Comprador con menos productos',
	                 'Comprador con mayor dinero invertido',
					 'Comprador con menor dinero invertido'];
	for(r in reports){
		$('.dropdown-menu').append('<li><a href="#">' + reports[r] + '</a></li>')
	}
}

// Reports

// User with more bought products
function moreProducts() {
	var products = -1;
	var user;
	for(u in users){
		if(users[u].user_info.rolData.type === 'normal' && users[u].cart.length > products){
			products = users[u].cart.length;
			user = users[u];
		}
	}
	$('#userName').text(user.user_info.name);
	$('#productCount').text(products);
}

// User with less bought products
function lessProducts() {
	var products = 1000;
	var user;
	for(u in users){
		if(users[u].user_info.rolData.type === 'normal' && users[u].cart.length < products){
			products = users[u].cart.length;
			user = users[u];
		}
	}
	$('#userNameMP').text(user.user_info.name);
	$('#productCountMP').text(products);
}

// User with more money spent in the app
function moreMoney() {
	var money = -1;
	var user;
	for(u in users){
		if(users[u].user_info.rolData.type === 'normal'){
			var user_money = 0;
			for(p in users[u].cart){
				user_money += users[u].cart[p].price;
			}
			if(user_money > money){
				money = user_money;
				user = users[u];
			}
		}
	}
	$('#userNameMM').text(user.user_info.name);
	$('#productCountMM').text('$'+money);
}

// User with less money spent in the app
function lessMoney() {
	var money = 9999999999999999;
	var user;
	for(u in users){
		if(users[u].user_info.rolData.type === 'normal'){
			var user_money = 0;
			for(p in users[u].cart){
				user_money += users[u].cart[p].price;
			}
			if(user_money < money){
				money = user_money;
				user = users[u];
			}
		}
	}
	$('#userNameLM').text(user.user_info.name);
	$('#productCountLM').text('$'+money);
}