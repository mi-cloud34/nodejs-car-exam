const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CarouselSchema = new Schema(
  {
    crlimg: { type: String,default: "default.jpg",},
    
  },
  { timestamps: true, versionKey: false, emitIndexErrors: true }
);
module.exports = mongoose.model("Carousel", CarouselSchema);
