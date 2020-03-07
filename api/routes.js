const express = require('express');
const seedRoutes = express.Router();

let Seed = require('./seedSchema');
let User = require('./userSchema');

seedRoutes.route('/add').post( (req, res) => {
  console.log(req.body)
    let seed = new Seed({
      page: req.body.page,
      isSpa: req.body.isSpa,
      method: req.body.method,
      numberOfChildren: req.body.numberOfChildren
    });
    seed.save()
      .then(() => {
        console.log('saved!')
        res.status(200).send("saved!")
      })
      .catch((error) => {
        console.log(error)
        res.status(400).send(error);
      });
  });

seedRoutes.route('/fetchAll').get((req, res) => {
  Seed.find({} , '_id page').then(seeds => {
    res.status(200).send(seeds)
  }).catch(err => {
    res.status(400).send(err)
  })
}) 

seedRoutes.route('/removeSeeds').post((req, res) => {
  console.log('body: ' + JSON.stringify(req.body))
  Seed.deleteMany({ _id: req.body}).then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(400).send(err)
  })
})

seedRoutes.route('/login').post((req, res) => {
  console.log('body: ' + JSON.stringify(req.body))
  User.find({username: req.body.username, password: req.body.password}).then(result => {
    console.log(result)
    if(!Array.isArray(result) || !result.length){
      res.status(200).send("Invalid Credentials")
    } else {
      res.status(200).send("ok")
    }
  }).catch(err => {
    res.status(400).send(err)
  })
})

  
module.exports = seedRoutes;