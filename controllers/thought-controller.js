const { User, Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // get single thought
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No Thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a thought and push the created thought's _id to the associated user's thoughts array field
  createThought({body}, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No User find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //update a thought
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      body,
      { runValidators: true, New: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: params.thoughtId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Thought deleted, but no user found'})
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => res.status(500).json(err));
  },
  //create reaction
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought frind with ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction
  removeReaction({params}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought find with this ID!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;