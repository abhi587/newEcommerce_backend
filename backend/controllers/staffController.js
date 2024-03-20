const StaffModel = require("../models/staffModel")
const catchAsyncErrors = require("../middleware/catchAsyncErrors")

exports.addStaff = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastName, email, mobileNo} = req.body;
    const staffData = await StaffModel.create(req.body)
    res.status(201).send({
        status: true,
        message:"new staff is created",
        data : staffData
    })
})
