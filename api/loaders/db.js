const Mongoose=require('mongoose');
const db=Mongoose.connection;
db.once("open",()=>{
    console.log("DB baglantısı başarılı");
});
const connectDB=async()=>{

    await Mongoose.connect(process.env.DB_URI,{
        dbName:process.env.DB_NAME,
        useNewUrlParser: true,
       useUnifiedTopology: true,
    })
//     await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     //useCreateIndex: true, //make this true
//     autoIndex: true, //make this also true
// });
}
module.exports={
    connectDB
}