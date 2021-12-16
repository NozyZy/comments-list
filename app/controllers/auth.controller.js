// import User model
const User = require("../models/user.model");

// import jsonwebtoken
const jwt = require('jsonwebtoken');

// import bcryptjs - hashing function
const bcrypt = require('bcryptjs');

// import auth config
const config = require('./auth.config');
const user = require("../models/user.model.js");

// DEFINE CONTROLLER FUNCTIONS
// User Register function
exports.register = (req, res) => {
    const user = req.body;
    user.role = 'user';
    let newUser = new User(user);
    newUser.hash_password = bcrypt.hashSync(user.password, 10);
    newUser.save()
        .then(() => {
            let token = jwt.sign(user, config.secret,
                {expiresIn: 21600} // expires in 24 hours
            );
            res.status(200).send({
                auth: true,
                token: token,
                user: user
            });
        })
        .catch(err => {
            switch (err.code) {
                case(11000):
                    res.status(401).send("This email is already used!");
                    break;
                default:
                    res.status(500).send(err.message);
            }
        });
};

// User Sign function
exports.signIn = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) return res.status(401).json({message: 'Authentication failed. User not found.'});
        else {
            if (!user.comparePassword(req.body.password)) return res.status(401).json({message: 'Authentication failed. Wrong password.'});
            else {
                res.json({
                    token: jwt.sign({
                            email: user.email,
                            fullName: user.fullName,
                            role: user.role,
                            _id: user._id,

                        },
                        config.secret,
                        {expiresIn: 21600})
                });
            }
        }
    });
};

// User Login function
exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) return res.status(500).send('Authentication failed. Error on the server.');
        if (!user) return res.status(404).send('Authentication failed. No user found.');
        let passwordIsValid = bcrypt.compareSync(req.body.password, user.hash_password);
        if (!passwordIsValid) return res.status(401).send('Authentication failed. Invalid password');
        let token = jwt.sign({
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                _id: user._id
            }, config.secret,
            {expiresIn: 21600} // expires in 24 hours
        );
        res.status(200).send({
            auth: true,
            token: token,
            user: user
        });
    });
}

// Check if user is login
exports.loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({message: 'Unauthorized user!'});
    }
};

// Check if
exports.adminRequired = (req, res, next) => {
    if (req.user && req.user.role.includes('admin')) {
        next();
    } else {
        res.status(401).json({message: 'Unauthorized user!'});
    }
};

// Fetch all users
exports.findAll = (req, res) => {
    if (req.user && req.user.role.includes('admin')) {
        User.find()
            .then(users => {
                res.send(users);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    }
}

// Update a user role
exports.updateRole = (req, res) => {
    if (req.user && req.user.role.includes('admin')) {
        User.findOneAndUpdate(
            { email: req.body.email },
            { role: req.body.role === 'superadmin' ? 'ban' : req.body.role })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'user not found with email '
                            + req.body.email
                    });
                }
                res.send(user);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'user not found with email ' +
                            req.body.email
                    });
                }
                return res.status(500).send({
                    message: 'Error updating user with email ' +
                        req.body.email
                });
            });
    }

}

// Update a user favs
exports.updateFav = (req, res) => {
    if (!req.user || !req.body) return res.status(404).json({message : 'User not found '})
    if (req.user.email === req.body.email) {
        User.findOneAndUpdate(
            { email: req.body.email },
            { favs: req.body.favs })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: 'user not found with email '
                            + req.body.email
                    });
                }
                res.send(user);
            })
            .catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: 'user not found with email ' +
                            req.body.email
                    });
                }
                return res.status(500).send({
                    message: 'Error updating user with email ' +
                        req.body.email
                });
            });
    } else {
        res.status(401).json({message: 'Unauthorized user! (' + req.query.email + ')'})
    }

}

// Fetch all favs for the user
exports.favs = (req, res) => {
    if (!req.user || !req.query) return res.status(404).json({message : 'User not found '})
    if (req.user.email === req.query.email) {
        User.findOne({
            email: req.query.email
        })
            .then(user => {
                res.send(user.favs)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
    } else {
        res.status(401).json({message: 'Unauthorized user! (' + req.query.email + ')'})
    }
}
