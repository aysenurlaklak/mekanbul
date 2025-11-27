var mongoose=require("mongoose");
var dbURI="mongodb+srv://test:test@cluster0.3foxuer.mongodb.net/mekanbul?appName=Cluster0";
mongoose.connect(dbURI);
mongoose.connection.on("connected",function(){
    console.log("mongoose" +dbURI+"adresindeki veritabanına bağlandı!\n");

});
mongoose.connection.on("error",function(){
    console.log("Mongoose bağlantı hatası\n");

});
mongoose.connection.on("disconnected",function(){
    console.log("Mongoose bağlantısı kesildi\n");

});

process.on("SIGINT",function(){
    mongoose.connection.close();
    console.log("Mongoose uygulama sonlandırma nedeniyle bağlantıyı kapattı.");
    process.exit();

});
require("./venue");
