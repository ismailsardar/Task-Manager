/**
 * task-menage projects / tasks models
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */
const mongoose = require('mongoose');
const tasksSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    status:{type:String},
    email:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const TasksModel = mongoose.model('tasks',tasksSchema);
module.exports = TasksModel;