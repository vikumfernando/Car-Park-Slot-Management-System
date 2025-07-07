const router = require("express").Router();
let Vehicle = require('../models/Vehicle');

//Adding vehicle information to the DB

router.route("/arrival").post((req, res) => {
    const vehicleNumber = req.body.vehicleNumber;
    const arrivalTime = req.body.arrivalTime;
    const amount = req.body.amount || 0; // Default amount is 0
    const status = req.body.status || "Parked"; // Default status is "Parked"

    const newVehicle = new Vehicle({
        vehicleNumber,
        arrivalTime,
        amount,
        status
    });

    newVehicle.save().then(() => {
        res.json("Vehicle information added successfully");
    }).catch((err) => {
        console.log("Error occurred while adding vehicle information: " + err);
        res.status(500).json("Error occurred while adding vehicle information");
    });
})

//Retreiving all vehicles
router.route("/").get((req, res) => {

    Vehicle.find().then((vehicles) => {
        res.json(vehicles)
    }).catch((err) => {
        console.log("Error while retreivind vehicle information!" + err);
    })
})

//Deleting a vehicle
router.route("/departure/:id").delete(async (req, res) => {

    let vehicleNum = req.params.id;

    await Vehicle.findByIdAndDelete(vehicleNum).then(() => {
        res.status(200).send({status: "Vehicle departured!"});
    }).catch((err) => {
        console.log(err);
        res.status({status: "Error detected"});
    })
})

module.exports = router;