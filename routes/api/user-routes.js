const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    unfriend
} = require('../../controllers/user.controller')

// /api/users Get all users and post request
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/users/:userId get single user along with PUT and Delete requests
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId Post and Delete requests by friend Id
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(unfriend)

module.exports = router;

