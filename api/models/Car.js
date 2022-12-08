const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarSchema = new Schema(
  {
    carname: { type: String, required: true },
    modelId: { type:mongoose.Types.ObjectId,required:true,ref:"Model" },
    yearId: {  type:mongoose.Types.ObjectId,required:true,ref:"Year"},
    colorId: {  type:mongoose.Types.ObjectId,required:true,ref:"Color" },
    //colorId: { type: String, required: [true, "Please provide a name"],},
    kmId: { type:mongoose.Types.ObjectId,required:true,ref:"Km" },
    price: { type: Number, required: true },
    lt: {type: Number,required: true,},
    lg: {type: Number,required: true,},
    carimage: { type: String,default: "default.jpg",},
    userId:{ type:mongoose.Types.ObjectId,ref:"User"
  },
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Car", CarSchema);
