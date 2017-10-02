"use strict";

/**
 * Creates the initial data and saves it in to the local storage
 */

var itemID = localStorage.getItem('itemID') === null ? 0: JSON.parse(localStorage.getItem('itemID'));

{
// Featured images
	const featuredImgs = {
		imgs: [
			{
				name: 'fry',
				img: 'resources/img/featured/f9a.jpg'
			},
			{
				name: 'nyan cat',
				img: 'resources/img/featured/nyan-cat.jpg'
			},
			{
				name: 'cry',
				img: 'resources/img/featured/llora.jpg'
			},
			{
				name: 'doge',
				img: 'resources/img/featured/doge.jpg'
			},
			{
				name: 'augustus',
				img: 'resources/img/featured/NqDyE9I.png'
			}, {
				name: 'feel',
				img: 'resources/img/featured/feel.jpg'
			}, {
				name: 'trump',
				img: 'resources/img/featured/trump.jpg'
			}
		]
	};
// Pepe frog's images
	const pepeImgs = {
		imgs: [
			{
				name: 'pepetrump',
				img: 'resources/img/pepe/pepetrump.png'
			},
			{
				name: 'pepe1',
				img: 'resources/img/pepe/pepe1.jpg'
			},
			{
				name: 'pepe-bullbasaur',
				img: 'resources/img/pepe/pepe-bulbasaur.jpg'
			},
			{
				name: 'pepe-troll',
				img: 'resources/img/pepe/pepe-troll.png'
			},
			{
				name: 'suicidepepe',
				img: 'resources/img/pepe/suicide-pepe.jpg'
			},
			{
				name: 'romantic pepe',
				img: 'resources/img/pepe/romantic-pepe.jpg'
			}
		]
	};
// Feel images
	const feelImgs = {
		imgs: [
			{
				name: 'clasic feel',
				img: 'resources/img/feel/classic_feel.png'
			},
			{
				name: 'nazi feel',
				img: 'resources/img/feel/nazi-feel.jpg'
			},
			{
				name: 'realistic feel',
				img: 'resources/img/feel/realistic-feel.jpg'
			},
			{
				name: 'suposed to feel',
				img: 'resources/img/feel/suposed_to_feel.jpg'
			}
		]
	};
// Doge images
	const dogeImgs = {
		imgs: [
			{
				name: 'Doge Navideño',
				img: 'resources/img/doge/christmas.jpg'
			},
			{
				name: 'Doge Clasico',
				img: 'resources/img/doge/clasic-doge.png'
			},
			{
				name: 'Cute Doge',
				img: 'resources/img/doge/cute-doge.png'
			},
			{
				name: 'Doge Kawai',
				img: 'resources/img/doge/doge-kawai.jpg'
			},
			{
				name: 'Doge Pixelado',
				img: 'resources/img/doge/doge-pixeled.png'
			},
			{
				name: 'Doge Minion',
				img: 'resources/img/doge/minion-doge.jpg'
			},
			{
				name: 'Student Doge',
				img: 'resources/img/doge/student-doge.jpg'
			},
			{
				name: 'Sexi Doge',
				img: 'resources/img/doge/doge-schoolgirl.jpg'
			}
		]
	};

// Featured items
	const featured = mapItems(featuredImgs);
// Pepe items
	const pepe = mapItems(pepeImgs);
// Feel items
	const feel = mapItems(feelImgs);
// Doge items
	const doge = mapItems(dogeImgs);

	const items = {
		featured: featured,
		pepe: pepe,
		feel: feel,
		doge: doge
	};

	// Saves all the items in the local storage
	var _items = localStorage.getItem('items');
	if(_items === null) {
		localStorage.setItem('items', JSON.stringify(items));
	}
};

/** Auxiliar Functions **/

// Makes a JSON of items with the array data
function mapItems(array) {
	return {
		items: array.imgs.map(function (img, index) {
			return(
				{
					img: img.img,
					name: img.name,
					id: getID(),
					price: getPrice(),
					stock: getStock(),
					solds: 0
				}
			);
		})
	}
}

// Manages the items id
function getID() {
	return itemID++;
}

// Return a random price
function getPrice() {
	const max = 100, min = 10;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Return a random stock value
function getStock() {
	const max = 50, min = 0;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}