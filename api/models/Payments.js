const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PaymentSchema = new Schema(
  {
    personname: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expiry: { type: Date,required:true },
    cvv: { type: Number, required: true },
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"User"
  },
  carId:{
    type:mongoose.Types.ObjectId,
    required:true,
    ref:"Car"
},
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Payment", PaymentSchema);
