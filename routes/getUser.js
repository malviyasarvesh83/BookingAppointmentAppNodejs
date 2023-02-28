const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/bookappointment', userController.getUser);
router.post('/allappointment', userController.postUser);
router.get('/allappointment', userController.showUser);
router.get('/bookappointment/:id', userController.editUser);
router.post('/bookappointment/:id', userController.updateUser);
router.get('/allappointment/:id', userController.deleteUser);

module.exports = router;