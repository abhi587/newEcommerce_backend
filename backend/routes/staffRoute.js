const express = require("express")
const {addStaff, getAllStaffs} = require("../controllers/staffController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const router = express.Router();

router
    .route("/admin/staff/new")
    .post(
        isAuthenticatedUser,
        authorizeRoles("admin"),
        addStaff
    );

router.route("/admin/staff/get")
        .get(getAllStaffs)


        
module.exports = router;