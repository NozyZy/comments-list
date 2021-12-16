module.exports = function(app) {

    const comments = require('../controllers/comment.controller.js');
    const auth = require('../controllers/auth.controller.js');

    // Create a new comment
    app.route('/api/comments')
        .post(auth.loginRequired, comments.create);

    // Find All comments
    app.route('/api/comments')
        .get(comments.findAll);

    // Find comments
    app.route('/api/comments/find')
        .get(auth.loginRequired, comments.find)

    // Update comment
    app.route('/api/comments')
        .put(auth.loginRequired, comments.update)

    // Delete all comments
    app.route('/api/comments')
        .delete(auth.loginRequired, comments.delete)
}
