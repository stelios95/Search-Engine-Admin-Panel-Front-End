const express = require('express');
const seedRoutes = express.Router();

let Seed = require('./seedSchema');

seedRoutes.route('/add').post(function (req, res) {
    console.log(req.body)
    
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
        res.status(200).send("saved!")
      })
      .catch(() => {
        res.status(400).send("unable to save to database");
      });
  });

  
module.exports = seedRoutes;