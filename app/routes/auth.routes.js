module.exports = function(app) {

    const auth = require('../controllers/auth.controller');

    // Register to the page
    app.post('/auth/register', auth.register);

    // Login the page
    app.post('/auth/login', auth.login);

    // Login required
    app.get('/auth', auth.loginRequired)

    // Get all users
    app.route('/auth/users')
        .get(auth.adminRequired, auth.findAll)

    // Update user role
    app.route('/auth/update/role')
        .post(auth.adminRequired, auth.updateRole)

    // Update user role
    app.route('/auth/update/fav')
        .post(auth.loginRequired, auth.updateFav)

    // Fetch all user favs
    app.get('/auth/favs', auth.favs)
}
