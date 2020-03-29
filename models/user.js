//Implementing joi
const joi = require('joi');
//Implementing mongoose
const mongoose = require('mongoose');
//Implementing config
const config = require('config');
//Implementing jwt
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
   }]



});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id, _user_id: this.user_id},"privatekey"); //TODO:FIX JWT
    return token;
}

const User = mongoose.model('User',userSchema);


function validateUser(User){
        const schema = {
            user_id: joi.string().min(2).max(50).required(),
            user_generated_services: joi.required(),
            scanned_devices: joi.required()
        };

        return joi.validate(User,schema);
}

exports.User = User;
exports.validate = validateUser;
