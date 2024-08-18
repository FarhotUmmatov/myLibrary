document.getElementById('add-btn').addEventListener('click', function() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('card-container').innerHTML = '';
});

let myLibrary = [];
let bookId = 0; // Global variable to keep track of book IDs
let isEditMode = false; // Variable to track if we're in edit mode
let editingBookId = null; // To store the ID of the book being edited

function Book(title, author, pages, readStatus) {
    this.id = bookId++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

document.getElementById('bookForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (isEditMode) {
        updateBook(editingBookId);
    } else {
        addBookToLibrary();
    }
    
    displayBook();
});

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.getElementById('read-status').value;

    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);

    console.table(myLibrary);
    resetForm();
}

function displayBook() {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('cards');

        bookCard.innerHTML = `
            <h4>${book.title}</h4>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.readStatus}</p>
            <br>
            <img class="delete-icon" src="src/trash.svg" data-id="${book.id}" alt="delete trash-icon">
            <img class="edit-icon" src="src/edit-icon.svg" data-id="${book.id}" alt="edit-icon">
        `;
        container.appendChild(bookCard);
    });

    document.querySelectorAll('.delete-icon').forEach(button => {
        button.addEventListener('click', deleteBook);
    });

    document.querySelectorAll('.edit-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            editBook(this.getAttribute('data-id'));
        });
    });
}

function deleteBook(event) {
    const bookId = parseInt(event.target.getAttribute('data-id'));
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    displayBook();
}

document.getElementById('close-btn').addEventListener('click', function () {
    resetForm();
    displayBook();
});

function editBook(bookId) {
    const book = myLibrary.find(book => book.id == bookId);
    if (!book) return;

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    document.getElementById('read-status').value = book.readStatus;

    document.getElementById('form-container').style.display = 'block';
    document.querySelector('#bookForm button[type="submit"]').textContent = 'Update';

    isEditMode = true;
    editingBookId = bookId;
}

function updateBook(bookId) {
    const book = myLibrary.find(book => book.id == bookId);
    if (!book) return;

    book.title = document.getElementById('title').value;
    book.author = document.getElementById('author').value;
    book.pages = document.getElementById('pages').value;
    book.readStatus = document.getElementById('read-status').value;

    resetForm();
    displayBook();
}

function resetForm() {
    document.getElementById('bookForm').reset();
    document.getElementById('form-container').style.display = 'none';
    document.querySelector('#bookForm button[type="submit"]').textContent = 'Save';
    isEditMode = false;
    editingBookId = null;
}
