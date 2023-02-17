// Pobierz notatki z localStorage albo stwórz pusty Array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Znajdź index notatki po ID
function findNoteIndex(id) {
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].id === id) {
			return i;
		}
	}
	return -1;
}

// Zapisz do localStorage
function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// Zdisplayuj notatki na stronie
function displayNotes() {
	let notesContainer = document.getElementById('notes-container');
	notesContainer.innerHTML = '';

	// Sortuj notatki po pinie i dacie utowrzenia
	notes.sort(function(a, b) {
		if (a.pin && !b.pin) {
			return -1;
		} else if (!a.pin && b.pin) {
			return 1;
		} else {
			return b.date - a.date;
		}
	});

	// Dodaj każdą notatke do containera
	for (let i = 0; i < notes.length; i++) {
		let note = notes[i];

		// Stwórz element notatki
		let noteElem = document.createElement('div');
		noteElem.classList.add('note');
		noteElem.style.backgroundColor = note.color;

		// Dodaj tytuł
		let titleElem = document.createElement('h2');
		titleElem.textContent = note.title;
		noteElem.appendChild(titleElem);

		// Dodaj zawartość
		let contentsElem = document.createElement('p');
		contentsElem.textContent = note.contents;
		noteElem.appendChild(contentsElem);

		// Dodaj date stworzenia
		let dateElem = document.createElement('p');
		dateElem.textContent = 'Created on ' + new Date(note.date).toLocaleString();
		noteElem.appendChild(dateElem);

		// Dodaj akcje (edytowanie, usuwanie)
		let actionsElem = document.createElement('div');
		actionsElem.classList.add('actions');

		// Przycisk edytowania
		let editButtonElem = document.createElement('button');
		editButtonElem.textContent = 'Edit';
		editButtonElem.addEventListener('click', function() {
			editNote(i);
		});
		actionsElem.appendChild(editButtonElem);

		// Przycisk usuwania
		let deleteButtonElem = document.createElement('button');
		deleteButtonElem.textContent = 'Delete';
		deleteButtonElem.addEventListener('click', function() {
			deleteNote(i);
		});
		actionsElem.appendChild(deleteButtonElem);
		noteElem.appendChild(actionsElem);

		// Dodanie elementu notatki do containera
		notesContainer.appendChild(noteElem);
	}
}

function editNote(index) {
	// Pobierz values notatki
	let note = notes[index];
	let title = note.title;
	let contents = note.contents;
	let color = note.color;
	let pin = note.pin;

	// Wypełnij forma valuesami notatki
	document.getElementById('title').value = title;
	document.getElementById('contents').value = contents;
	document.getElementById('color').value = color;
	document.getElementById('pin').checked = pin;

	// Usuń istniejącą notatke
	notes.splice(index, 1);

	// Zapisz notatki do localStorage
	saveNotes();

	// Pokaż zaktualizowane notatki
	displayNotes();
}

function deleteNote(index) {
	// Usuń notatke z arraya notatek
	notes.splice(index, 1);

	// Zapisz notatki do localStorage
	saveNotes();

	// Pokaż zaktualizowane notatki
	displayNotes();
}

// Event listenery
document.getElementById('note-form').addEventListener('submit', function(event) {
	event.preventDefault();

	// Pobierz wartości z forma
	let title = document.getElementById('title').value;
	let contents = document.getElementById('contents').value;
	let color = document.getElementById('color').value;
	let pin = document.getElementById('pin').checked;
	let date = Date.now();
	let id = Math.random().toString();

	// Stwórz obiekt notatki
	let note = {
		id: id,
		title: title,
		contents: contents,
		color: color,
		pin: pin,
		date: date
	};

	// Dodaj notatke do arraya notatek
	notes.push(note);

	// Zapisz notatki do localStorage
	saveNotes();

	// Wyczyść forma
	document.getElementById('note-form').reset();

	// Pokaż zaktualizowane notatki
	displayNotes();
});