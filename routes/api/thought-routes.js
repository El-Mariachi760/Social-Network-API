const router = require('express').Router();

const {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

// /api/thoughts Get all thoughts and post request
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// /api/users/:userId get single user along with PUT and Delete requests
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/users/:userId/friends/:friendId Post and Delete requests by friend Id
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)

module.exports = router;