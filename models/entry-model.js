const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  createdBy: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  sarin: {
    type: Number,
    require: true,
  },
  inclu: {
    type: Number,
    require: true,
  },
  aq: {
    type: Number,
    require: true,
  },
  fourp: {
    type: Number,
    require: true,
  },
  galexy: {
    type: Number,
    require: true,
  },
  ls: {
    type: Number,
    require: true,
  },
});

const Entry = new mongoose.model("entry", entrySchema);
module.exports = Entry;
