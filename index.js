
const express = require("express")
const app = express()

const config = require("config")

const mongoose = require("mongoose")
const user = require("./routes/users/user")

app.get("/",(req,res)=>{
  res.send("Testing!")
})



if (!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR: jwtPrivateKey key is not defined");
  process.exit(0)
}

mongoose.connect("mongodb+srv://admin:ad3AFb33VnOS3LGL@cluster0-gzaj2.mongodb.net/test?retryWrites=true&w=majority")
  .then(() => console.log("Connected to database \n --------------- \n"))
  .catch(error => console.error("Could not connect to database"));

app.use(express.json())

app.use("/api/user",user)
app.listen(3000, ()=> console.log("Listening to port 3000"))
