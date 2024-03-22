const StaffModel = require("../models/staffModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//************************Add Staff*************************/

exports.addStaff = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, mobileNo } = req.body;
    const staffData = await StaffModel.create(req.body);
    res.status(201).send({
        success: true,
        message: "New staff is created",
        data: staffData
    });
});

//*******************Get All Staffs********************** */

exports.getAllStaffs = catchAsyncErrors(async (req, res, next) => {
    const staffDetails = await StaffModel.find();
    if (staffDetails.length === 0) {
        return res.status(404).send({
            success: false,
            message: "No data found"
        });
    }
    return res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data: staffDetails
    });
});

//*********************Get Staff Details By id*********** */

exports.getStaffDetailsById = catchAsyncErrors(async (req, res, next) => {
    const staffId = req.params.staffId;
    const staffdetailsById = await StaffModel.findById(staffId);
    if (!staffdetailsById) {
        return res.status(404).send({
            success: false,
            message: "No data found"
        });
    }
    return res.status(200).send({
        success: true,
        message: "Data fetched successfully",
        data: staffdetailsById
    });
});

//**********************Update Staff Details***************** */

exports.updateStaffDetails = catchAsyncErrors(async (req, res, next) => {
    const staffId = req.params.staffId;
    const { firstName, lastName, email, mobileNo } = req.body;
    let staffDetails = await StaffModel.findById(staffId);
    if (!staffDetails) {
        return res.status(404).send({
            success: false,
            message: "No data found with this staffId"
        });
    }
    if (firstName) 
        staffDetails.firstName = firstName;
    if (lastName) 
        staffDetails.lastName = lastName;
    if (email) 
        staffDetails.email = email;
    if (mobileNo) 
        staffDetails.mobileNo = mobileNo;

    staffDetails = await staffDetails.save();
    return res.status(200).send({
        success: true,
        message: "Data updated successfully",
        updatedData: staffDetails
    });
});

//**********************Delete Staff Details****************** */

exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
    const staffId = req.params.staffId;
    const deletedData = await StaffModel.findByIdAndDelete(staffId);
    if (!deletedData) {
        return res.status(404).send({
            success: false,
            message: "No data found with this id"
        });
    }
    return res.status(200).send({
        success: true,
        message: "Staff deleted successfully"
    });
});
