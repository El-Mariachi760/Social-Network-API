const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req,res) {
        User.find({})
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // get user by id
    getUserById (req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) =>
            !user
                ? res.status(404).json({ message: "No User find with that ID!" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    // create user
    createUser({body}, res) {
        User.create(body)
            .then((user) => res.json(user))
            .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
            });
    },

    //  update user by Id
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            body,
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: "No User find with this ID!" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then((user) =>
            !user
                ? res.status(404).json({ message: "No User find with this ID!" })
                : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: "User and Thought deleted!" }))
            .catch((err) => res.status(500).json(err));
    },

    // add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { runValidators: true, new: true }
          )
            .then((user) =>
              !user
                ? res.status(404).json({ message: "No User find with this ID!" })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // unfriend someone
    unfriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
          )
            .then(
              (user) =>
                !user
                  ? res.status(404).json({ message: "No User find with this ID!" })
                  : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
        },       
}

module.exports = userController;