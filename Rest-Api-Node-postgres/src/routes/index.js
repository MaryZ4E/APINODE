const { Router } = require('express');
const router = Router();

const { getUsers, createUsers, getUserById, deleteUser, updateUser } = require('../controllers/index.controller')

router.get('/users',getUsers);
router.get('/users/:id',getUserById );
router.post('/users',createUsers);
router.delete('/users/:id' ,deleteUser);
router.put('/users/:id',updateUser);

module.exports = router;