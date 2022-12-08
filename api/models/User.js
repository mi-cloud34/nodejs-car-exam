const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const UserSchema=new Schema({
   
   
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
           // "Please try different email"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              "Please provide e valid email"     
              ]
         },
        
         password:{
             type:String,
             minlength:[6,"please provide a password with min length 6"],
             required:["true","please provide'a password"],
             select:false,
         }, 
          role:{
            type:String,
            //default:"user",
            enum:["userr","admin"],
            required:["true","please provide'a role"],
        },
         createdAt:{
             type:Date,
             default:Date.now

         },
        place:{
          type:String,
          //required:[true,"dont empty place "]
        },
        image:{
             type:String,
             default:"default.jpg"
         },
         blocked:{
             type:Boolean,
             default:false
         },
        
},{ timestamps:true,versionKey:false,emitIndexErrors: true });
module.exports=mongoose.model("User",UserSchema);
/*UserSchema.methods.generateJwtFromUser=function(){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env;
    const payload={
        id:this._id,
        name:this.name
    };
    const token=jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE
    });
    return token
}
UserSchema.methods.getResetPasswordTokenFromUser= function(){
    const randomHexString=crypto.randomBytes(15).toString("hex");
    const {RESET_PASSWORD_EXPIRE}=process.env
    const resetPasswordToken=crypto
   .createHash("SHA256")
   .update(randomHexString)
   .digest("hex");
   this.resetPasswordToken=resetPasswordToken;
   this.resetPasswordExpire=Date.now()+parseInt(RESET_PASSWORD_EXPIRE);
  return resetPasswordToken;
}
UserSchema.pre("save",function(next){
if (!this.isModified("password")) {
    next();
}
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) next(err);
       bcrypt.hash(this.password,salt,(err,hash)=>{
           if(err) next();
           this.password=hash;
           next();
       })
    });
})*/












