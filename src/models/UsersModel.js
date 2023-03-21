/**
 * task-menage projects / user models
 * Date : 21/03/2023
 * auth: Ismile Sardar
 */
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{type:String,unique:true},
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String},
    password:{type:String},
    photo:{type:String},
    createdDate:{type:Date,default:Date.now()}
},{versionKey:false});

const UsersModel = mongoose.model('users',userSchema);
module.exports = UsersModel;