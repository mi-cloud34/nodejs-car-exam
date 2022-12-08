const BaseService =require("./BaseService");
const BaseModel=require("../models/Payments");
class Payment extends BaseService{

    constructor(){
        super(BaseModel);
    }
    list(where){
        return  BaseModel.find(where||{}).populate([
            {
                path: "userId",
                select: "name email",
              },
            {
              path: "carId",
              select: "carname price carimage",
            },
           
          ])
      }
    
}
module.exports=Payment;