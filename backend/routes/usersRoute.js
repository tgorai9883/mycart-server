const express = require("express");
const { authController,getUserProfile,registeredUser } = require("../controllers/usersController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("").post(registeredUser); //new user registration
router.post("/login",authController); //post email and password auth
router.route("/profile").get(protect,getUserProfile); //get user profile private route

module.exports = router;