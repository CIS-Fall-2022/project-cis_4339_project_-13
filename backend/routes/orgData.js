const express = require("express"); 
const router = express.Router(); 
require("dotenv").config();  

//importing data model schemas
let { orgdata } = require("../models/models"); 

//GET all clients and events from declared org in .env
router.get('/', (req, res, next) => {
    orgdata.aggregate([ //gathers data from both primaryData and eventsData
      { $match : {_id: process.env.orgId} },
      { $lookup : {
            from : 'primaryData',
            localField : '_id',
            foreignField : 'orgId',
            as : 'primaryData'
      } },
      { $lookup : {
            from: 'eventData',
            localField : '_id',
            foreignField : 'orgId',
            as : 'eventData'
      }}
    ], (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
  });

module.exports = router;
