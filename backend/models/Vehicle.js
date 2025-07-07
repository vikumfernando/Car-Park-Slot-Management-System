const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
   
    vehicleNumber: {
        type : String,
        required : true,
    },

    arrivalTime: {
        type : Date,
        default: Date.now, // Default to current date and time
    },

    amount: {
        type : Number,
    },
    
    status: {
        type : String,
        default: "Parked", // Default status is "Parked"
    }
})

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;