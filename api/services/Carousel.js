const BaseService =require("./BaseService");
const BaseModel=require("../models/Carousel");
class Carousel extends BaseService{

    constructor(){
        super(BaseModel);
    }

}
module.exports=Carousel;