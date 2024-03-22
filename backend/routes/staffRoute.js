const express = require("express")
const {addStaff, 
    getAllStaffs, 
    getStaffDetailsById, 
    updateStaffDetails, 
    deleteStaff} = require("../controllers/staffController")
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

router.route("/admin/staff/getById/:staffId")
        .get(getStaffDetailsById)

router.route("/admin/staff/updateDetails/:staffId")
        .put(updateStaffDetails)

router.route("/admin/staff/delete/:staffId")
        .delete(deleteStaff)
        
module.exports = router;