const userModel = require('../model/model');

// create and save new user
exports.create = (req, res) => {

    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }

    // new user
    const newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // save user in database
    newUser
        .save(newUser)
        .then(data => {
            // res.send(data);
            res.redirect("/addUser")
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while create operation!"
            });
        });
}

// retrive and return all users/ retrive and return single user
exports.find = (req, res) => {

    if (req.query.id) {

        const id = req.query.id;

        userModel.findById({ _id: id })
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Not found user with id ${id}` })
                } else {
                    res.send(data);
                }
            }).catch(err => {
                res.status(500).send({ message: "Error reteriving user with id" + id });
            })

    } else {
        const foundUser = userModel.find()
            .then((user) => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occured while reyeriving user informatiom!"
                });
            })
    }


}

// update a new identified user by user id
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400)
            .send({ message: "Dtat to update can not be empty!" });
    }

    const id = req.params.id;

    userModel.findByIdAndUpdate(id, req.body)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` })
            } else {
                res.send(data);
            }
        }).catch(err => {
            res.status(500).send({ Message: "Error Update user information!" });
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {

    const id = req.params.id;
    userModel.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user with ${id}. Maybe id is wrong!` })
            } else {
                res.status(500).send({ Message: "User was deleted!" });
            }
        })
        .catch(err => {
            res.status(500).send({ Message: "User not deleted with id " + id });
        })
} 