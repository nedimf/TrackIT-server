const {User,Admin,validate,validateAdmin} = require('../../models/user');
const bcrypt = require('bcryptjs')
const express = require('express');
const auth = require('../../middleware/auth')
const authorization = require('../../middleware/authorization')

const router = express.Router();

router.put("/syncing",auth,async(req,res) => {

  const id = req.user_id._id
  const user = await User.findById(id)

  const scanned_devices = req.body.scanned_devices
  const user_generated_services  = req.body.user_generated_services

  if (!scanned_devices.length < 1 && !user_generated_services.length < 1) {

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


    let user = await User.findOne({user_id: generatedID });
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


router.post('/admin',async(req,res)=>{

    const {error} = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Admin.findOne({username: req.body.username});
    if(user) return res.status(400).send("Error:Admin with that name is already singup.");


    user = new Admin({

      username:req.body.username,
      password:req.body.password

    });

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password,salt);

    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token);
    res.json("Success: Admin signup successfuly.");

    console.log(user)


});

router.post('/infected',auth,authorization,async(req,res)=>{

  const adminID = req.user_id._id
  const infectedID = req.body.infected


  const user = await User.findById(infectedID)
  const admin = await Admin.findById(adminID)

  console.log(admin);
  user.infected = true

  const infectedArray = []
  infectedArray.push(infectedID)

  infectedArray.forEach(element =>
    admin.assingedInfections.push(element)
  )


  await user.save()
  await admin.save()

  res.status(200).json({"Infection recorded":"true"})

})


module.exports = router;
