const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    id: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    mobile: {
        type: Number,
        require: true,
    }
})

const Contact = new mongoose.model("contact", contactSchema);
module.exports = Contact;