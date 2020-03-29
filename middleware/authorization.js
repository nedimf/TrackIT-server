const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('./auth');

function autharization(req,res,next){

  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send('Access deneid.No token  provided.');

  try{
      const decoded = jwt.verify(token,config.get('jwtPrivateKey'));
      req.user_id = decoded;

      if(decoded.admin){
         next()
      }else{
        res.status(400).send('Access forbidden.');

      }

  }catch(ex){
      res.status(400).send('Invalide token.');
  }

}

module.exports = autharization;
