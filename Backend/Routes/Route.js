let express = require("express");
let router = express.Router();
let { registerUser, getAllUsers, loginUser } = require("../Controller/Logic");


router.post("/users/register", registerUser);


router.get("/users", getAllUsers); 

router.post("/users/login", loginUser);

module.exports = router;
