const mongoose = require("mongoose");
const Vehicle = require("./models/Vehicle");
console.log("Scheduler started");
 
setInterval(async() => {

    const currentTime = new Date();
    console.log("Current time:", currentTime);

  try {
    const vehicles = await Vehicle.find({ vehicleNumber: { $exists: true } });

    for (const vehicle of vehicles) {
      const arrivalTime = new Date(vehicle.arrivalTime);
      const parkedMinutes = (currentTime - arrivalTime) / (1000 * 60);

      if(vehicle.status != "Fined") {
      
          if (parkedMinutes >= 0.1) { // 60 minutes //0.1 for testing
          console.log(`Vehicle ${vehicle.vehicleNumber} parked for over 1 hours.`);

          vehicle.amount += 200;
          await vehicle.save();

          vehicle.status = "Fined";
          await vehicle.save();

          console.log(`New amount: ${vehicle.amount}`);
        }

      }
      
    }
  } catch (err) {
    console.error("Scheduler error:", err.message);
  }

}, 1000*60); // 1 minute interval