const express = require("express")
const {addStaff} = require("../controllers/staffController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const router = express.Router();

router
    .route("/admin/staff/new")
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        addStaff
    );

module.exports = router;