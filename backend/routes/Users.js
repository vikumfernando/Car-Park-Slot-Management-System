const router = require("express").Router();
let User = require("../models/User");


// registering a new user
router.route("/signup").post(async (req, res) => {
    const { username, email, password, phone, address } = req.body;

    try {
        // Check if email or username already exists
        const existingUser = await User.findOne({
            $or: [{ email: email }, { username: username }]
        });

        if (existingUser) {
            return res.status(400).json("User with this email or username already exists");
        }

        const newUser = new User({
            username,
            email,
            password,
            phone,
            address,
        });

        await newUser.save();
        res.json("User registered successfully");
    } catch (err) {
        console.log("Error occurred while registering the new user: " + err);
        res.status(500).json("Error occurred while registering the new user");
    }
});


//Sign in a user
router.route("/signin").post(async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email: email, password: password});

        if(!user){
          
            return res.status(400).json("Invalid email or password");
            
        }else{
            return res.status(200).json({
            message: "User logged in successfully!"  });
        }

    }catch(err) {
        console.log("Error occurred while signing in the user: " + err);
        return res.status(500).json("Error occurred while signing in the user");
    }   

});

module.exports = router;
