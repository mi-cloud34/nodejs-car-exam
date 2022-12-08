const BaseService =require("./BaseService");
const BaseModel=require("../models/Car");
class Car extends BaseService{

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
              path: "modelId",
              select: "model",
            },
            {
                path: "kmId",
                select: "km",
            },
            {
              path: "colorId",
              select: "color",
            },
            {
                path: "yearId",
                select: "year",
              },
          ])
      }
      findOne({id}) {
        //if (!expand) return this.BaseModel.findOne(where);
        return this.BaseModel.findOne({_id:id}).populate([
         
          {
             path: "modelId",
             select: "model",
           },
           {
               path: "kmId",
               select: "km",
           },
           {
             path: "colorId",
             select: "color",
           },
           {
               path: "yearId",
               select: "year",
             },
         ])
      
      }
      categorylist=(where)=>{
        return  BaseModel.find(where||{}).populate([
         
         {
            path: "modelId",
            select: "model",
          },
          {
              path: "kmId",
              select: "km",
          },
          {
            path: "colorId",
            select: "color",
          },
          {
              path: "yearId",
              select: "year",
            },
        ])
        
      }
   /*   colorlist=(where)=>{
        return  BaseModel.find(where||{})
        .populate( {
              path:"colorId",
              select:"color"
            }); 
      };
      kmlist=(where)=>{
        return  BaseModel.find(where||{})
        .populate( {
              path:"kmId",
              select:"km"
            }); 
      }
      yearlist=(where)=>{
        return  BaseModel.find(where||{})
        .populate( {
              path:"yearId",
              select:"year"
            }); 
      }*/
      
}
module.exports=Car;