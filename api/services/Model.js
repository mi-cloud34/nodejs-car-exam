const BaseService =require("./BaseService");
const BaseModel=require("../models/Model");
class Model extends BaseService{

    constructor(){
        super(BaseModel);
    }
    list(where){
        return  BaseModel.find(where||{}).populate(
            {
                path: "userId",
                select: "name email",
              },
           )
      }
    
}
module.exports=Model;