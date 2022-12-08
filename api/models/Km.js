const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const KmSchema = new Schema(
  {
    km: { type: String, required: [true, "Please provide a name"],},
    description: { type: String},
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Km", KmSchema);
