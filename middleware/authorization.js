const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./auth');

function autharization(req,res,next){

    const user_id = req.params.userId;
    const token_decoded_user_id = req.user_id;

    if(token_decoded_user_id._id == user_id){

        res.status(200);
        next();
    }else{
        res.status(403);
        res.json({Status: " Access forbiden"});

    }
}

module.exports = autharization;
