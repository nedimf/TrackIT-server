
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
   }]



});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this.id, _user_id: this.user_id},config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('User',userSchema);


function validateUser(User){
        const schema = {
            user_generated_services: joi.required(),
            scanned_devices: joi.required()
        };

        return joi.validate(User,schema);
}

exports.User = User;
exports.validate = validateUser;
