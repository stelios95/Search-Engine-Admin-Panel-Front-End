const express = require('express');
const seedRoutes = express.Router();

let Seed = require('./seedSchema');

seedRoutes.route('/add').post(function (req, res) {
    let seed = new Seed({
        parentUrl: req.body.page,
        childrenUrls: req.body.children.map(el => {
            return {
                child: el
            }
        }) ,
        depth: req.body.depth
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
  Seed.find({} , '_id parentUrl').then(seeds => {
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

  
module.exports = seedRoutes;