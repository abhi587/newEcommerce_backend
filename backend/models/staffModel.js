const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type : String,
        required: true
    },
    email : {
        type: String,
        require : true
    },
    mobileNo :{
        type: Number,
        required: true
    },
})
//

module.exports = mongoose.model("Staff", staffSchema)