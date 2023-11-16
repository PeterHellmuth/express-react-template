var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

// GET request for one user
router.get("/:id", userController.user_detail);

/* POST create a user. */
router.post("/create", userController.user_create_post);

/* POST login a user. */
router.post("/login", userController.user_login_post);

/* POST logout a user. */
router.post("/logout", userController.user_logout_post);

/*
router.post(
  "/update-password",
  userController.verifyToken,
  userController.user_password_post
);*/

module.exports = router;
