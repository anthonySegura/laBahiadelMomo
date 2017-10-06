"use strict";

/**
 *  Register and login functions
 */

$(document).ready(function () {
	sessionStorage.clear();
	lockUserFields(true);
	$('#admin').click(function () {
		if($('#admin').is(":checked")){
			lockUserFields(true);
		}
		else{
			lockUserFields(false);
		}
	});
	// Some users data
	{
		const user1 = {
			cart: [],
			wishList: [],
			user_info: {
				name: 'rodolfo',
				age: 14,
				email: 'niñorata666@rata.com',
				password: '123',
				username: 'niñoRata64',
				rolData: {
					type: 'normal',
					creditCardInfo: {
						cardNumber: 123,
						securityCode: 123
					}
				}
			}
		};

		const user2 = {
			cart: [{
				id: 7,
				img: "resources/img/pepe/pepetrump.png",
				name: "pepetrump",
				price: 75,
				solds: 0,
				stock: 20
			}],
			wishList: [],
			user_info: {
				name: 'albertito',
				age: 28,
				email: 'niñorata27@rata.com',
				password: '123',
				username: 'niñoRata37',
				rolData: {
					type: 'normal',
					creditCardInfo: {
						cardNumber: 123,
						securityCode: 123
					}
				}
			}
		};
		var users = localStorage.getItem('users');
		if (users === null) {
			users = [];
			users.push(user1, user2);
			localStorage.setItem('users', JSON.stringify(users));
		}
	}
});

// Save the user into the local storage
function registerUser() {
	var users = localStorage.getItem('users');
	var userData = getRegisterInfo();
	// New User
	var user = {
		user_info: userData,
		cart: [],
		wishList: []
	}
	if(users === null){
		users = [];
		users.push(user);
		// parse to String and save the list in local storage
		localStorage.setItem('users', JSON.stringify(users));
	}
	else{
		// parse to JSON
		users = JSON.parse(users);
		users.push(user);
		localStorage.setItem('users', JSON.stringify(users));
	}

	loadMainView(user);
}

// Search the user info into the local storage
// if the user is registered loads the main view
function login(){
	var users = localStorage.getItem('users');
	var userData = getLoginInfo();
	users = JSON.parse(users);
	// Search the user in the user list
	console.log(userData);
	for(var i = 0; i < users.length; i++){
		//console.log(users[i]);
		if(users[i].user_info.username === userData.username && users[i].user_info.password === userData.password){
			console.log('ingresando');
			loadMainView(users[i]);
			return;
		}
	}
	//User not found message
	$("#loginForm").append("<div class=\"alert alert-warning\" role=\"alert\">\n" +
		"                         <strong>Datos incorrectos papu</strong> Si no tienes un cuenta registrate, es gratis :v\n" +
		"                   </div>");
}

// Save the current user in the session storage and load the main view depending on the type of user
function loadMainView(user) {
	sessionStorage.setItem('currentUser', JSON.stringify(user));
	switch (user.user_info.rolData.type){
		case 'normal':
			location.href = '../../index.html';
			break;
		case 'administrator':
			location.href = '../views/adminView.html';
			break;
		default:
			location.reload();
			break;
	}
}

// Returns user data depending on the type of user
function userData() {
	if($('#admin').is(":checked")){
		return{
			type: 'administrator'
		}
	}
	else {
		return{
			type: 'normal',
			creditCardInfo: {
				cardNumber: $('#tarjeta').val(),
				securityCode: $('#code').val(),
				expDate: $('#data').val()
			}
		}
	}
}

function getRegisterInfo() {
	return {
		name: $('#nombre').val(),
		lastname: $('#apellidos').val(),
		username: $('#username').val(),
		password: $('#passw').val(),
		age: $('#edad').val(),
		email: $('#email').val(),
		rolData : userData()
	}
}

function getLoginInfo() {
	return{
		username: $('#username_l').val(),
		password: $('#passw_l').val()
	}
}

function lockUserFields(lock) {
	$('#tarjeta').prop('disabled', lock);
	$('#code').prop('disabled', lock);
	$('#date').prop('disabled', lock);
}





