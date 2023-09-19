const express = require("express");
const authorize = require("../middlewares/authMiddleware");
const {
  authUser,
  registerUser,
  getUserDetails,
  updateUserDetails
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", authUser);
router.route("/signup").post(registerUser);
router.route("/userdetails/:email").get(authorize,getUserDetails);
router.route("/updateuserdetails/:id").put(authorize,updateUserDetails);

module.exports = router;
