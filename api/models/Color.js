const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ColorSchema = new Schema(
  {
    //color: { type: Schema.Types.ObjectId, ref: 'Color' },
    color: { type: String, required: [true, "Please provide a name"],},
    description: { type: String},
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Color", ColorSchema);
