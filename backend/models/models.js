const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    //require: true is used to require this field to be filled with valid data 
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    orgId: { type: String, default: process.env.orgId}
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    orgId: { type: String, default: process.env.orgId}
}, {
    collection: 'eventData',
    timestamps: true
});

//collection for orgData
let orgDataSchema = new Schema({
    _id: { type: String},
    orgName: {
        type: String,
        require: true
    },
    
    primaryData: {
        _id: { type: String, default: uuid.v1 },
        firstName: {
            type: String,
            require: true
        },
        middleName: {
            type: String,
        },
            lastName: {
            type: String,
            required: true
        },
        email: {
            type: String
        },
        phoneNumbers: {
            type: Array,
            required: true
        },
        address: {
            line1: {
            type: String
        },
            line2: {
            type: String,
        },
            city: {
            type: String,
            required: true
        },
        county: {
            type: String,
        },
        zip: {
            type: String,
        }
        ,
        orgId: { type: String}
        },
    },

    eventData: {
        _id: { type: String, default: uuid.v1 },
        eventName: {
            type: String,
            require: true
        },
        services: {
            type: Array
        },
        date: {
            type: Date,
            required: true
        },
        address: {
            line1: {
            type: String
        },
            line2: {
            type: String,
        },
            city: {
            type: String,
        },
            county: {
            type: String,
        },
            zip: {
            type: String,
        }
        },
        description: {
            type: String,
        },
        attendees: [{
            type: String
        }],
        orgId: { type: String}
    },
  
}, {
    collection: 'orgData',
    timestamps: true
});

// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('orgData', orgDataSchema)

// package the models in an object to export 
module.exports = { primarydata, eventdata, orgdata }
