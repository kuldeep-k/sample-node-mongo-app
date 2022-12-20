const express = require("express");
const app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_DSN || 'mongodb://node-sample-mongo-db/kubernetes_app1');
const userModel = require("./models/User"); 

const bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 4000;        // set our port

 
app.get("/users", (req, res) => {
  userModel.find().then((users) => {
    res.status(200).json({status: true, data: users});
  });  
});
 
app.get("/users/:id", (req, res) => {
  userModel.find({_id: mongoose.Types.ObjectId(req.params.id)}).then((users) => {
    res.status(200).json({status: true, data: users[0]});
  });  
});
 
app.delete("/users/:id", (req, res) => {
  userModel.deleteOne({_id: mongoose.Types.ObjectId(req.params.id)}).then((users) => {
    res.status(200).json({status: true});
  });  
});
 
app.put("/users/:id", (req, res) => {
  userModel.update({_id: mongoose.Types.ObjectId(req.params.id)}, { $set: req.body}).then((users) => {
    res.status(200).json({status: true});
  });
});
 
app.post("/users", (req, res) => {
  let p = new userModel(req.body);  
  p.save().then((users) => {
    res.status(201).json({status: true});
  });
});

app.listen(port, function () {
  console.log("listening on " + port);
});

