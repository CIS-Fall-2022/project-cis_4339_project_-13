const express = require("express"); 
const router = express.Router(); 

//importing data model schemas
let { primarydata } = require("../models/models"); 
let { eventdata } = require("../models/models")

//GET all entries
router.get("/", (req, res, next) => { 
    primarydata.find( {orgId: process.env.orgId},
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            } 
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find( 
        { _id: req.params.id }, 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => {  
    let dbQuery = "http://localhost:3000/primaryData/search/";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" }, orgId: {$eq: process.env.orgId} }
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
    };
    primarydata.find(  
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//POST - create a new client
router.post("/", (req, res, next) => { 
    primarydata.create( 
        req.body,
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data); 
            }
        }
    );
    primarydata.createdAt;
    primarydata.updatedAt;
    primarydata.createdAt instanceof Date;
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => { 
    primarydata.findOneAndUpdate( 
        { _id: req.params.id }, 
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});


//delete a client by id
router.delete('/:id', (req, res, next) => { 
    primarydata.findByIdAndRemove(
        {_id: req.params.id}, (error, data) => { 
            if (error) {
                return next(error);
            } else {
                eventdata.updateMany( {}, {$pull: {attendees: { $in: [req.params.id]}}}, (error, data) => { res.json(data)}) //removes client from event when deleted
                //res.json(data); 
            }
    });
});

module.exports = router;
