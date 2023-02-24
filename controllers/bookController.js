const {Book, Author, BookAuthor} = require('../models');
const genres = ['Non-fiction', 'Fiction', 'Fantasy', 'Sci-Fi', 'Horror', 'Psychological Horror', 'Modernist', 'Mystery', 'Graphic Novel', 'Thriller', 'Autobiography'];

// view all
module.exports.viewAll = async function (req, res) {
    const books = await Book.findAll();
    res.render('book/view_all', {books});
};

// profile
module.exports.viewProfile = async function (req, res) {
    const book = await Book.findByPk(req.params.id, {
        include: 'author'
    });
    const authors = await Author.findAll();
    let availableAuthors = [];
    for (let i = 0; i < authors.length; i++) {
        if (!bookHasAuthor(book, authors[i])) {
            availableAuthors.push(authors[i]);
        }
    }
    res.render('book/profile', {book, availableAuthors})
};

// render add form
module.exports.renderAddForm = function (req, res) {
    const book = {
        title: '',
        genre: genres[0],
        publisher: '',
        page_count: 0,
        cover_image: '',
        description: '',
    }
    res.render('book/add', {book, genres});
};

// add
module.exports.addBook = async function (req, res) {
    const book = await Book.create({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.publisher,
        page_count: req.body.page_count,
        cover_image: req.body.cover_image,
        description: req.body.description,
    })
    res.redirect(`/books/profile/${book.id}`)
}

// render edit form
module.exports.renderEditForm = async function (req, res) {
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book, genres});
};

// update
module.exports.updateBook = async function (req, res) {
    const book = await Book.update({
        title: req.body.title,
        genre: req.body.genre,
        publisher: req.body.publisher,
        page_count: req.body.page_count,
        cover_image: req.body.cover_image,
        description: req.body.description,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`)
}

// delete
module.exports.deleteBook = async function (req, res) {
    await Book.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/books')
}

// add author to book
module.exports.addAuthorToBook = async function(req, res) {
    await BookAuthor.create({
        author_id: req.body.author,
        book_id: req.params.bookId,
    });
    res.redirect(`/books/profile/${req.params.bookId}`)
}

module.exports.removeAuthor = async function (req, res) {
    await BookAuthor.destroy({
        where: {
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/books/profile/${req.params.bookId}`)
}

function bookHasAuthor(book, author) {
    for (let i = 0; i < book.author.length; i++) {
        if (author.id === book.author[i].id) {
            return true
        }
    }
    return false
}