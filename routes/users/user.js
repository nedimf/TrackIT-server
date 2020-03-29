const {User,validate,validateUserUpdate,validateUserPassword} = require('../../models/user');
const bcrypt = require('bcryptjs')
const express = require('express');
const router = express.Router();

router.get("/me", async(req,res) => {

})


router.post('/signup',async(req,res)=>{

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({id: req.body.user_id});
    if(user) return res.status(400).send("Error:User is already signup.");


    user = new User({
        user_generated_services: req.body.user_generated_services,
        scanned_devices: req.body.scanned_devices
    });

    //Hashing password
    const salt = await bcrypt.genSalt(16);
    user.user_id = salt


    //Saving user
    await user.save();

    //Generate auth token for user
    const token = user.generateAuthToken();
    res.header('x-auth-token',token);
    res.json("Success: User signup successfuly.");

    console.log(user)
});

module.exports = router;
