const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registrationSchema = mongoose.Schema({
    event : {
        type: Schema.Types.ObjectId,
        ref: "Event",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    created_on : {
        type: Date,
        default: Date.now
    } 
});

module.exports = mongoose.model("Group", GroupSchema);