const {Author} = require('../models');

// view all
module.exports.viewAll = async function (req, res) {
    const authors = await Author.findAll();
    res.render('author/view_all', {authors});
}

// profile
module.exports.viewProfile = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/profile', {author})
}

// render add

// add

// render edit
module.exports.renderEditForm = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}

// edit

// delete