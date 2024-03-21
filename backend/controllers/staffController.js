const StaffModel = require("../models/staffModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")


//************************Add Staff*************************/


exports.addStaff = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, mobileNo} = req.body;
    const staffData = await StaffModel.create(req.body)
    res.status(201).send({
        status: true,
        message:"new staff is created",
        data : staffData
    })
})

//*******************Get All Staffs********************** */

exports.getAllStaffs = catchAsyncErrors(async (req, res, next) => {
    const staffDetails = await StaffModel.find()
})



