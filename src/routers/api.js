/**
 * task-menage projects / app Routers
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */

const express = require('express');
const router = express.Router();

router.get('/demo',(req,res)=>{res.status(200).json({data:"Success Demo Routing!"})});

module.exports = router;