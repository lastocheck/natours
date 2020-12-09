const express = require('express');
const { signUp } = require('../controllers/authController');

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signUp);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
