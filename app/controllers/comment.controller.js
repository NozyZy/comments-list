let Comment = require('../models/comment.model.js');

// POST a Comment
exports.create = (req, res) => {
    // Create a Comment
    const comment = new Comment({
        name: req.body.name,
        title: req.body.title,
        description: req.body.description ? req.body.description : '',
        hidden: req.body.hidden ? req.body.hidden : false
    });

    // Save a Comment in the MongoDB
    comment.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// FETCH all Comments
exports.findAll = (req, res) => {
    Comment.find()
        .then(comments => {
            res.send(comments);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
        });
    });
};

// FIND Comments
exports.find = (req, res) => {
    const query = req.query;
    if (query.id) {
        Comment.findOne({_id: query.id})
            .then(comment => {
                if(!comment) {
                    return res.status(404).send({
                        message: "Comment not found with id " +
                            query.id
                    });
                }
                res.send(comment);
            }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Comment not found with id " +
                        query.id
                });
            }
            else {
                return res.status(500).send({
                    message: "Error retrieving Comment with id " +
                        query.id
                });
            }
        });
    }
    else if (query.name) {
        Comment.find({name: { $regex: query.name.toLowerCase(), $options: '-i' }})
            .then(comment => {
                if (!comment.length) {
                    return res.status(404).send({
                        message: "Comments not found with name " +
                            query.name
                    });
                }
                res.send(comment);
            }).catch(err => {
                return res.status(500).send({
                    message: "Error -> " +  err
                });
            });
    }
    else {
        return res.status(404).send({
            message: "Bad id or name passed, cannot find comment id "
                +  query.id + " or name " + query.name
        });
    }
};

// UPDATE a Comment
exports.update = (req, res) => {
    // Find comment and update it
    const body = req.body;
    console.log(body)
    Comment.findOneAndUpdate({ _id: body.id }, {
        hidden: body.hidden,
        description: body.description
    }, { new: true })
        .then(comment => {
            if(!comment) {
                return res.status(404).send({
                    message: "Comment not found with id " +
                        body.id
                });
            }
            res.send(comment);
        })
        .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Comment not found with id " +
                    body.id
            });
        }
        return res.status(500).send({
            message: "Error updating comment with id " +
                body.id
        });
    });
};

// DELETE a Comment
exports.delete = (req, res) => {
    const query = req.query;
    Comment.findOneAndRemove( {_id: query.id})
        .then(comment => {
            if(!comment) {
                return res.status(404).send({
                    message: "Comment not found with id " +
                        query.id
                });
            }
            res.send({message: "Comment deleted successfully!"});
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Comment not found with id " +
                        query.id
                });
        }
        return res.status(500).send({
            message: "Could not delete comment with id " +
                query.id
        });
    });
};


// // POST a Comment
// exports.create = (req, res) => {
//     res.json({message : "Create !"})
// };
//
// // FETCH all Comments
// exports.findAll = (req, res) => {
//     res.json({message : "Find all !"})
// };
//
// // FIND a Comment
// exports.findOne = (req, res) => {
//     res.json({message : "Find one !"})
// };
//
// exports.findByName = (req, res) => {
//     res.json({message : "Find by name !"})
// }
//
// // UPDATE a Comment
// exports.update = (req, res) => {
//     res.json({message : "Update !"})
// };
//
// // DELETE a Comment
// exports.delete = (req, res) => {
//     res.json({message : "Delete !"})
// };
