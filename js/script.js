$(function() {
	
	//Generowanie identyfikatora
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	};

	//Klasa tworząca kolumnę
	function Column(name) {
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $column = $('<div>').addClass('column');
			var $columnHeader = $('<div>').addClass('column-header');
			var $buttonContainer = $('<div>').addClass('button-container');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $cloumnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn btn-xs btn-danger').text('Usuń kartę');
			var $columnAddCard = $('<button>').addClass('btn btn-xs btn-primary add-card').text('Dodaj zadanie');

			//Kasowanie kolumny
			$columnDelete.click(function() {
				self.removeColumn();
			});

			//Dodawanie karteczki
			$columnAddCard.click(function() {
				self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});

			//Tworzenie kolumny
			$buttonContainer.append($columnAddCard).append($columnDelete);
			$columnHeader.append($columnTitle).append($buttonContainer);
			$column.append($columnHeader).append($cloumnCardList);

			//Zwrot utworzonej kolumny
			return $column;
		}
	}
	Column.prototype = {
		addCard: function(card) {
			this.$element.children('ul').append(card.$element);
		},
		removeColumn: function() {
			this.$element.remove();
		}
	}

	//Klasa tworząca kartę
	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn btn-xs btn-danger').text('x');

			//Kasowanie karty
			$cardDelete.click(function() {
				self.removeCard();
			});

			//Tworzenie karty
			$card.append($cardDelete).append($cardDescription);

			//Zwrot utworzonej karty
			return $card;
		}
	}
	Card.prototype = {
		removeCard: function() {
			this.$element.remove();
		}
	}

	var board = {
		name: 'Tablica kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-card-list').sortable({connectWith: '.column-card-list', placeholder: '.card-placeholder'}).disableSelection();
	}

	$('.create-column').click(function() {
		var name = prompt('Wpisz nazwę kolumny:');
		var column = new Column(name);
		board.addColumn(column);
	});

	//Tworzenie kolumn
	var todoColumn = new Column('Do zrobienia');
	var doingColumn = new Column('W trakcie');
	var doneColumn = new Column('Skończone');

	//Dodawanie kolumn do tablicy
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(doneColumn);

	//Tworzenie nowych egzemplarzy kart
	var card1 = new Card('Nowe zadanie');
	var card2 = new Card('Stworzyć tablicę kanban');

	//Dodanie kart do kolumn
	todoColumn.addCard(card1);
	doingColumn.addCard(card2);

});