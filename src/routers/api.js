/**
 * task-menage projects / app Routers
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

const express = require('express');
const UsersControllers = require('../controllers/UsersControllers');
const AuthVerify = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();

router.get('/demo',(req,res)=>{res.status(200).json({data:"Success Demo Routing!"})});

router.post('/registration',UsersControllers.registration);
router.post('/login',UsersControllers.login);
router.post('/profileUpdate',AuthVerify,UsersControllers.profileUpdate);

module.exports = router;