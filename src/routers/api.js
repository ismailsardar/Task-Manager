/**
 * task-menage projects / app Routers
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

const express = require('express');
const UsersControllers = require('../controllers/UsersControllers');
const TasksController = require('../controllers/TasksController');
const AuthVerify = require('../middleware/AuthVerifyMiddleware');
const router = express.Router();

router.get('/demo',(req,res)=>{res.status(200).json({data:"Success Demo Routing!"})});

router.post('/registration',UsersControllers.registration);
router.post('/login',UsersControllers.login);
router.post('/profileUpdate',AuthVerify,UsersControllers.profileUpdate);

//Task router
router.post('/createTask',AuthVerify,TasksController.createTask);
router.get('/allTask',AuthVerify,TasksController.allTask);
router.post('/deleteTask/:id',AuthVerify,TasksController.deleteTask);
router.post('/updateStatus/:id/:status',AuthVerify,TasksController.updateStatus);
router.get('/listTaskByStatus/:status',AuthVerify,TasksController.listTaskByStatus);
router.get('/taskStatusCount',AuthVerify,TasksController.taskStatusCount);

module.exports = router;