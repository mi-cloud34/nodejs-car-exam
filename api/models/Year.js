const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const YearSchema = new Schema(
  {
    year: { type: String, required: [true, "Please provide a name"],},
    description: { type: String},
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Year", YearSchema);
