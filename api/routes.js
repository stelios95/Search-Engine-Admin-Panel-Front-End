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

  
module.exports = seedRoutes;