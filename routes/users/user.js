const {User,validate} = require('../../models/user');
const bcrypt = require('bcryptjs')
const express = require('express');
const auth = require('../../middleware/auth')

const router = express.Router();

router.put("/syncing",auth,async(req,res) => {

  const id = req.user_id._id
  const user = await User.findById(id)

  const scanned_devices = req.body.scanned_devices
  const user_generated_services  = req.body.user_generated_services

  if (!scanned_devices.length < 1 || !user_generated_services.length < 1) {

    user_generated_services.forEach(element =>
      user.user_generated_services.push(element)
    )
    scanned_devices.forEach(element =>
      user.scanned_devices.push(element)
    )

  }else{
    res.status(401).json({"syncing":"failed","message":"Data count must be greater than 1!"})
  }

  await user.save()

  res.status(200).json({"syncing":"done"})


})


router.post('/signup',async(req,res)=>{

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const generatedID = await bcrypt.genSalt(16);


    let user = await User.findOne({user_id: salt });
    if(user) return res.status(400).send("Error:User is already signup.");


    user = new User({
        user_generated_services: req.body.user_generated_services,
        scanned_devices: req.body.scanned_devices
    });

    user.user_id = generatedID

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token);
    res.json("Success: User signup successfuly.");

    console.log(user)


});

module.exports = router;
