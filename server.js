const express=require("express")
const http=require("http")
const socketio=require("socket.io")
const path=require("path")
const app=express();
const server=http.createServer(app)
const io=socketio(server)
app.use("/static",express.static(path.join(__dirname,"static")))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/templates/index.php")
})
app.get("/admin",(req,res)=>{
    res.sendFile(__dirname+"/templates/admin.html")
})
app.post("/admin",(req,res)=>{
    var data=req.body;
    console.log(data);
})
io.on("connection",(socket)=>{
    console.log("conectado")
})
server.listen(2000,(err)=>{
    console.log("rodando")
})