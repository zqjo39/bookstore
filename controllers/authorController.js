const {Author, Book, BookAuthor} = require('../models');


// view all
module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
};

// profile
module.exports.viewProfile = async function (req, res) {
    const author = await Author.findByPk(req.params.id, {
        include: 'book'
    });
    const books = await Book.findAll();
    let availableBooks = [];
    for (let i = 0; i < books.length; i++) {
        if (!authorHasBook(author, books[i])) {
            availableBooks.push(books[i]);
        }
    }
    res.render('author/profile', {author, availableBooks})
};

// render add
module.exports.renderAddForm = function (req, res) {
    const author = {
        first_name: '',
        last_name: '',
        picture: '',
        date_of_birth: 0,
    }
    res.render('author/add', {author});
};

// add
module.exports.addAuthor = async function (req, res) {
    const author = await Author.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        picture: req.body.picture,
        date_of_birth: req.body.date_of_birth,
    })
    res.redirect(`/authors/profile/${author.id}`);
}

// render edit
module.exports.renderEditForm = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
};

// update
module.exports.updateAuthor = async function (req, res) {
    const author = await Author.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        picture: req.body.picture,
        date_of_birth: req.body.date_of_birth,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/authors/profile/${req.params.id}`);
};

// delete
module.exports.deleteAuthor = async function (req, res) {
    await Author.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/authors')
}

// add book to author
module.exports.addBookToAuthor = async function (req, res) {

    await BookAuthor.create({
        book_id: req.body.book,
        author_id: req.params.authorId
    })
    res.redirect(`/authors/profile/${req.params.authorId}`)
}

// remove book from author
module.exports.removeBook = async function (req, res) {
    await BookAuthor.destroy({
        where: {
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/authors/profile/${req.params.authorId}`)
}

function authorHasBook(author, book){
    for (let i = 0; i < author.book.length; i++) {
        if (book.id === author.book[i].id) {
            return true
        }
    }
    return false
};