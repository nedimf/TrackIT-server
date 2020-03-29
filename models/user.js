
const joi = require('joi');
const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    user_generated_services:[{
      type:String
    }],
    scanned_devices: [{
       name: String,
       rssi:String,
       date:String,
       uuid:String,
       values: mongoose.Schema.Types.Mixed
   }],
   infected:{
     type:Boolean,
     default:false
   }



});

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:2,
        maxlength:255
    },
    password:{
      type:String,
      required:true,
      minlength:12,
      maxlength:255
    },
    assingedInfections: [{
      type:String,
    }]

});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id, _user_id: this.user_id},config.get('jwtPrivateKey'))
    return token
}

adminSchema.methods.generateAuthToken = function(){
    const admin_token = jwt.sign({_id: this.id, admin: true},config.get('jwtPrivateKey'))
    return admin_token
}

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Admin',adminSchema)

function validateUser(User){
        const schema = {
            user_generated_services: joi.required(),
            scanned_devices: joi.required()
        };

        return joi.validate(User,schema);
}

function validateAdmin(Admin){
        const schema = {
            username: joi.required(),
            password: joi.required()
        };

        return joi.validate(Admin,schema);
}

exports.User = User;
exports.Admin = Admin;
exports.validate = validateUser;
exports.validateAdmin = validateAdmin;
