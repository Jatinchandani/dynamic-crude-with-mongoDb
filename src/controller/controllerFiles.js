/*** User controller : All business logic goes here ***/
const User = require("../model/user_model");
const bcrypt = require("bcryptjs");
/*** -------------------------------this method is to create the user ---------------------------***/
exports.create = (req, res) => {
  /*** validation request ***/
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).send({
      message: "Required field can not be empty",
    });
  }
  /*** Create a user ***/
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    isActive: req.body.isActive,
    userType: req.body.userType,
  });

  /*** Save user to database***/
  user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

/***--------------------------------- Find all Users --------------------------------***/
 exports.findAll = (req, res) => {
    User.find()
      .sort({ name: -1 })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error Occurred",
        });
      });
  };

/***--------------------------------------- Find one User -----------------------------***/
 exports.findOne = (req, res) => {
    User.findById(req.query.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.query.id,
          });
        }
        res.status(200).send(user);
        console.log(user);
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Error retrieving user with id " + req.query.id,
        });
      });
  };

/**------------------------ Update a user with the specified id in the request ----------------------**/
 exports.UpdateUser = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.name) {
      res.status(400).send({
        message: "required fields cannot be empty",
      });
    }
    User.findByIdAndUpdate(req.query.id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "no user found",
          });
        }
        res.status(200).send(user);
      })
      .catch((err) => {
        return res.status(404).send({
          message: "error while updating the post",
        });
      });
  };

/***--------------- Delete a user with the specified id in the request ------------------***/
 exports.delete = (req, res) => {
    User.findByIdAndRemove(req.query.id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found ",
          });
        }
        res.send({ message: "User deleted successfully!" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "Could not delete user ",
        });
      });
  };