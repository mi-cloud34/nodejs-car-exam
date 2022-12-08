const BaseService =require("./BaseService");
const BaseModel=require("../models/User");
class User extends BaseService{

    constructor(){
        super(BaseModel);
    }

}
module.exports=User;